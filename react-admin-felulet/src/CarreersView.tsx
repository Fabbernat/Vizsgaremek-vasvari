type ApplicantItem = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  message?: string;
  cvFileName?: string;
  cvUrl?: string;
  createdAt?: string;
};

type CarreersViewProps = {
  applicants: ApplicantItem[];
};

export function CarreersView({ applicants }: CarreersViewProps) {
  return (
    <section className="currentView">
      <h1>Karrier / Beérkező pályázatok</h1>
      <p>
        Itt jelennek meg a weboldalon vagy az alkalmazásban beérkező álláspályázatok.
      </p>

      {applicants.length === 0 ? (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px dashed #999",
            borderRadius: "12px",
            background: "#f8f8f8"
          }}
        >
          <h2>Még nincs beérkező pályázat</h2>
          <p>
            A későbbiekben itt fognak megjelenni a jelentkezők adatai,
            az üzenetük, valamint a csatolt önéletrajz is.
          </p>

          <ul>
            <li>Név</li>
            <li>E-mail-cím</li>
            <li>Telefonszám</li>
            <li>Megpályázott pozíció</li>
            <li>Motivációs üzenet</li>
            <li>CV / önéletrajz csatolmány vagy link</li>
          </ul>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "16px",
            marginTop: "20px"
          }}
        >
          {applicants.map((applicant) => (
            <article
              key={applicant.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "16px",
                background: "#fff"
              }}
            >
              <h2 style={{ marginTop: 0 }}>{applicant.name}</h2>

              <ul>
                <li><strong>Azonosító:</strong> {applicant.id}</li>
                <li><strong>E-mail:</strong> {applicant.email}</li>
                <li>
                  <strong>Telefonszám:</strong> {applicant.phone || "Nincs megadva"}
                </li>
                <li>
                  <strong>Pozíció:</strong> {applicant.position || "Nincs megadva"}
                </li>
                <li>
                  <strong>Beérkezés ideje:</strong> {applicant.createdAt || "Ismeretlen"}
                </li>
              </ul>

              <div style={{ marginTop: "12px" }}>
                <strong>Üzenet:</strong>
                <p style={{ marginTop: "8px" }}>
                  {applicant.message?.trim()
                    ? applicant.message
                    : "A jelentkező nem írt külön üzenetet."}
                </p>
              </div>

              <div style={{ marginTop: "12px" }}>
                <strong>Önéletrajz:</strong>
                {applicant.cvUrl ? (
                  <p style={{ marginTop: "8px" }}>
                    <a
                      href={applicant.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      CV megnyitása
                    </a>
                  </p>
                ) : applicant.cvFileName ? (
                  <p style={{ marginTop: "8px" }}>
                    Csatolt fájl: {applicant.cvFileName}
                  </p>
                ) : (
                  <p style={{ marginTop: "8px" }}>
                    Nem érkezett külön CV, csak sima üzenet.
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}