export default function LoadingSpinner({ label = '·Îµù Áß...' }) {
  return (
    <div className="center-screen">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}