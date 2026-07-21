import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllTourPrices,
  createTourPrice,
  updateTourPrice,
  deleteTourPrice,
} from "../api/TourPriceApi";
import { useAuth } from "../context/useAuth";

const emptyForm = { name: "", pricePerGuestUsd: "", active: true };

const AdminTourPrices = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    getAllTourPrices()
      .then((res) => {
        if (mounted) setTours(res.data);
      })
      .catch((err) => {
        if (!mounted) return;
        if (err.response?.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        setError(err.response?.data?.message || "Could not load tour prices.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (t) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      pricePerGuestUsd: Number(t.pricePerGuestUsd).toFixed(2),
      active: t.active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const price = parseFloat(form.pricePerGuestUsd);
    if (!form.name.trim() || isNaN(price) || price <= 0) {
      setError("Please enter a valid tour name and a price greater than 0.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        pricePerGuestUsd: price,
        active: form.active,
      };
      if (editingId) {
        const { data } = await updateTourPrice(editingId, payload);
        setTours((prev) => prev.map((t) => (t.id === editingId ? data : t)));
      } else {
        const { data } = await createTourPrice(payload);
        setTours((prev) => [...prev, data]);
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save the tour price.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tour price? Existing bookings keep their reference, but new bookings can't pick this tour.")) return;
    try {
      await deleteTourPrice(id);
      setTours((prev) => prev.filter((t) => t.id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete the tour price.");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">Tour Prices</h1>
        <span className="badge bg-dark">{tours.length} total</span>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-3">
                {editingId ? "Edit Tour Price" : "Add New Tour Price"}
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Tour Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Sunset Hill Trek"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price per Guest (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    className="form-control"
                    placeholder="e.g. 25.00"
                    value={form.pricePerGuestUsd}
                    onChange={(e) =>
                      setForm({ ...form, pricePerGuestUsd: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    id="active"
                    type="checkbox"
                    className="form-check-input"
                    checked={form.active}
                    onChange={(e) =>
                      setForm({ ...form, active: e.target.checked })
                    }
                  />
                  <label htmlFor="active" className="form-check-label">
                    Active (bookable on the booking form)
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success" disabled={saving}>
                    {saving ? "Saving..." : editingId ? "Update" : "Create"}
                  </button>
                  {editingId && (
                    <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          {loading && (
            <div className="d-flex align-items-center gap-2 text-muted">
              <span className="spinner-border spinner-border-sm" />
              Loading tour prices...
            </div>
          )}

          {!loading && tours.length === 0 && !error && (
            <div className="alert alert-info">No tour prices yet. Add one on the left.</div>
          )}

          {!loading && tours.length > 0 && (
            <div className="table-responsive shadow-sm rounded">
              <table className="table table-hover align-middle mb-0 bg-white">
                <thead className="table-light">
                  <tr>
                    <th>Tour</th>
                    <th>Price / Guest</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((t) => (
                    <tr key={t.id}>
                      <td className="fw-semibold">{t.name}</td>
                      <td>${Number(t.pricePerGuestUsd).toFixed(2)}</td>
                      <td>
                        <span className={`badge bg-${t.active ? "success" : "secondary"}`}>
                          {t.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(t)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(t.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTourPrices;