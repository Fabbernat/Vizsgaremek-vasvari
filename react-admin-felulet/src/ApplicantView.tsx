import { exportCSV, exportJSON } from "./utils/export";

export type ApplicantItem = {
};

type ApplicantViewProps = {
  applicants: ApplicantItem[];
};

export function ApplicantView({ applicants }: ApplicantViewProps) {
  return (
    <div>
      <h1>Jelentkezők listája</h1>
      <button onClick={() => exportJSON(applicants, "applicants")}>
        Export JSON
      </button>

      <button onClick={() => exportCSV(applicants, "applicants")}>
        Export CSV
      </button>
    </div>
  );
}