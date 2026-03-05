export type ApplicantItem = {
};

type ApplicantViewProps = {
  applicants: ApplicantItem[];
};

export function ApplicantView({applicants}: ApplicantViewProps) {
    return (
        <div>
            <h1>Jelentkezők listája</h1>
        </div>
    );
}