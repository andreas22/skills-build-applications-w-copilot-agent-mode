import React, { useEffect, useState } from 'react';

function SimpleModal({ show, onClose, title, data }) {
  if (!show) return null;
  return (
    <>
      <div className="modal-backdrop-custom" onClick={onClose} />
      <div className="modal-custom">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{title}</h5>
            <button className="btn btn-sm btn-secondary" onClick={onClose}>Close</button>
          </div>
          <div className="card-body">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);

  const fetchData = () => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Fetching Activities from', endpoint);
    setLoading(true);
    setError(null);

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Activities response:', data);
        const list = Array.isArray(data) ? data : data && data.results ? data.results : [];
        setItems(list || []);
      })
      .catch((err) => {
        console.error('Activities fetch error', err);
        setError(String(err));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headers = items && items.length > 0 ? Object.keys(items[0]) : [];

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="h5 mb-0">Activities</h3>
        <div>
          <button className="btn btn-sm btn-primary me-2" onClick={fetchData}>Refresh</button>
        </div>
      </div>
      <div className="card-body">
        {loading && <div className="alert alert-info">Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items && items.length > 0 ? (
                items.map((it, idx) => (
                  <tr key={idx}>
                    {headers.map((h) => (
                      <td key={h}>{String(it[h] ?? '')}</td>
                    ))}
                    <td className="data-actions">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => setModalData(it)}>View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headers.length + 1} className="text-center">No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <SimpleModal show={!!modalData} onClose={() => setModalData(null)} title="Activity Details" data={modalData} />
    </div>
  );
}
