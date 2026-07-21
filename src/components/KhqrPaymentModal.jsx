import { useEffect, useRef, useState, useCallback } from 'react';
import QRCode from 'qrcode';
import { generateKhqr, checkKhqrStatus } from '../api/PaymentApi';

const POLL_INTERVAL_MS = 3000;

// Shows a Bakong KHQR code for a booking and polls the backend until the
// customer has paid. Any Cambodian banking / e-wallet app - Bakong, ABA
// Mobile, ACLEDA, Wing, etc. - can scan it, since KHQR is a shared national
// QR standard, not something tied to one bank.
const KhqrPaymentModal = ({ bookingId, onClose, onPaid }) => {
  const canvasRef = useRef(null);
  const pollRef = useRef(null);
  const tickRef = useRef(null);

  const [status, setStatus] = useState('loading'); // loading | pending | paid | expired | error
  const [payment, setPayment] = useState(null); // { qr, md5, amount, currency, expiresAt }
  const [error, setError] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const clearTimers = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    if (tickRef.current) clearInterval(tickRef.current);
  };

  const startCountdown = useCallback((expiresAt) => {
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(() => {
      const diff = Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
      setSecondsLeft(diff);
      if (diff <= 0) {
        clearInterval(tickRef.current);
      }
    }, 1000);
  }, []);

  const loadQr = useCallback(async () => {
    setStatus('loading');
    setError('');
    clearTimers();

    try {
      const { data } = await generateKhqr(bookingId);
      setPayment(data);
      setStatus(data.status === 'PAID' ? 'paid' : 'pending');
      startCountdown(data.expiresAt);

      if (data.status !== 'PAID') {
        pollRef.current = setInterval(async () => {
          try {
            const { data: latest } = await checkKhqrStatus(data.md5);
            if (latest.status === 'PAID') {
              setStatus('paid');
              clearTimers();
              onPaid?.(latest);
            } else if (latest.status === 'EXPIRED') {
              setStatus('expired');
              clearTimers();
            }
          } catch {
            // transient network hiccup - just try again next tick
          }
        }, POLL_INTERVAL_MS);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not generate the payment QR code. Please try again.');
      setStatus('error');
    }
  }, [bookingId, onPaid, startCountdown]);

  useEffect(() => {
    loadQr();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  useEffect(() => {
    if (payment?.qr && canvasRef.current && (status === 'pending' || status === 'paid')) {
      QRCode.toCanvas(canvasRef.current, payment.qr, { width: 240, margin: 1 }).catch(() => {
        setError('Could not render the QR code image.');
      });
    }
  }, [payment, status]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div
      className="modal fade show d-block"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4 text-center">
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close"
            onClick={onClose}
          />

          <h4 className="fw-bold mb-1">Scan to Pay</h4>
          <p className="text-muted mb-3">
            Scan with Bakong, ABA Mobile, ACLEDA, Wing, or any Cambodian banking app
          </p>

          {status === 'loading' && (
            <div className="py-5">
              <div className="spinner-border text-success" role="status" />
              <p className="mt-3 mb-0">Generating your KHQR code...</p>
            </div>
          )}

          {(status === 'pending' || status === 'paid') && payment && (
            <>
              <div className="d-flex justify-content-center mb-3">
                <canvas ref={canvasRef} />
              </div>

              <h5 className="fw-bold mb-1">
                ${Number(payment.amount).toFixed(2)} {payment.currency}
              </h5>

              {status === 'pending' && (
                <>
                  <p className="text-muted mb-2">
                    QR expires in {minutes}:{seconds}
                  </p>
                  <div className="d-flex align-items-center justify-content-center gap-2 text-muted">
                    <div className="spinner-border spinner-border-sm" role="status" />
                    <span>Waiting for payment...</span>
                  </div>
                </>
              )}

              {status === 'paid' && (
                <div className="alert alert-success mt-2 mb-0">
                  Payment received! Your booking is confirmed.
                </div>
              )}
            </>
          )}

          {status === 'expired' && (
            <div className="py-3">
              <div className="alert alert-warning">This QR code expired before payment was received.</div>
              <button type="button" className="btn btn-success" onClick={loadQr}>
                Generate a New QR Code
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="py-3">
              <div className="alert alert-danger">{error}</div>
              <button type="button" className="btn btn-success" onClick={loadQr}>
                Try Again
              </button>
            </div>
          )}

          {status === 'paid' && (
            <button type="button" className="btn btn-success w-100 mt-3" onClick={onClose}>
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default KhqrPaymentModal;
