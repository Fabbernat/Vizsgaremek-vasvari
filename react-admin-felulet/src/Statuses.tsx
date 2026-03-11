import React, { useEffect, useMemo, useState } from "react";

type ServiceStatus = "healthy" | "degraded" | "down" | "in-development";
type ReleaseChannel = "stable" | "beta";

type ServiceItem = {
  id: string;
  name: string;
  url: string;
  description: string;
  status: ServiceStatus;
  channel: ReleaseChannel;
  updatedAt: string;
};

type ServiceStatusBoardProps = {
  storageKey?: string;
  initialServices?: ServiceItem[];
  title?: string;
};

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: crypto.randomUUID(),
    name: "Weboldal",
    url: "https://royaldelivery.hu",
    description: "Publikus főoldal",
    status: "healthy",
    channel: "stable",
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Admin panel",
    url: "https://admin.royaldelivery.hu",
    description: "Belső adminisztrációs felület",
    status: "degraded",
    channel: "beta",
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "API",
    url: "https://api.royaldelivery.hu",
    description: "Publikus és belső backend végpontok",
    status: "healthy",
    channel: "stable",
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Futár app",
    url: "https://courier.royaldelivery.hu",
    description: "Futároknak szánt szolgáltatás",
    status: "in-development",
    channel: "beta",
    updatedAt: new Date().toISOString(),
  },
];

const STATUS_META: Record<
  ServiceStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  healthy: {
    label: "Teljesen jó",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dotClass: "bg-emerald-500",
  },
  degraded: {
    label: "Kisebb probléma",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
    dotClass: "bg-amber-500",
  },
  down: {
    label: "Down / nem elérhető",
    badgeClass: "bg-rose-100 text-rose-800 border-rose-200",
    dotClass: "bg-rose-500",
  },
  "in-development": {
    label: "Fejlesztés alatt",
    badgeClass: "bg-slate-100 text-slate-800 border-slate-200",
    dotClass: "bg-slate-500",
  },
};

const CHANNEL_META: Record<ReleaseChannel, { label: string; className: string }> = {
  stable: {
    label: "Nem béta",
    className: "bg-sky-100 text-sky-800 border-sky-200",
  },
  beta: {
    label: "BETA",
    className: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  },
};

const emptyDraft = (): Omit<ServiceItem, "id" | "updatedAt"> => ({
  name: "",
  url: "",
  description: "",
  status: "healthy",
  channel: "stable",
});

export default function ServiceStatusBoard({
  storageKey = "royal-delivery-service-statuses",
  initialServices = DEFAULT_SERVICES,
  title = "Royal Delivery service státuszok",
}: ServiceStatusBoardProps) {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [draft, setDraft] = useState<Omit<ServiceItem, "id" | "updatedAt">>(emptyDraft());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ServiceStatus | "all">("all");
  const [filterChannel, setFilterChannel] = useState<ReleaseChannel | "all">("all");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setServices(JSON.parse(stored) as ServiceItem[]);
      } else {
        setServices(initialServices);
      }
    } catch {
      setServices(initialServices);
    }
  }, [initialServices, storageKey]);

  useEffect(() => {
    if (services.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(services));
    }
  }, [services, storageKey]);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = [service.name, service.url, service.description]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = filterStatus === "all" || service.status === filterStatus;
      const matchesChannel = filterChannel === "all" || service.channel === filterChannel;

      return matchesSearch && matchesStatus && matchesChannel;
    });
  }, [services, search, filterStatus, filterChannel]);

  const stats = useMemo(() => {
    return {
      total: services.length,
      healthy: services.filter((s) => s.status === "healthy").length,
      degraded: services.filter((s) => s.status === "degraded").length,
      down: services.filter((s) => s.status === "down").length,
      inDevelopment: services.filter((s) => s.status === "in-development").length,
      beta: services.filter((s) => s.channel === "beta").length,
    };
  }, [services]);

  const resetForm = () => {
    setDraft(emptyDraft());
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!draft.name.trim()) return;

    if (editingId) {
      setServices((prev) =>
        prev.map((service) =>
          service.id === editingId
            ? {
                ...service,
                ...draft,
                name: draft.name.trim(),
                url: draft.url.trim(),
                description: draft.description.trim(),
                updatedAt: new Date().toISOString(),
              }
            : service,
        ),
      );
    } else {
      const newService: ServiceItem = {
        id: crypto.randomUUID(),
        name: draft.name.trim(),
        url: draft.url.trim(),
        description: draft.description.trim(),
        status: draft.status,
        channel: draft.channel,
        updatedAt: new Date().toISOString(),
      };

      setServices((prev) => [newService, ...prev]);
    }

    resetForm();
  };

  const handleEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setDraft({
      name: service.name,
      url: service.url,
      description: service.description,
      status: service.status,
      channel: service.channel,
    });
  };

  const handleDelete = (id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
    if (editingId === id) resetForm();
  };

  const handleQuickStatusChange = (id: string, status: ServiceStatus) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id
          ? { ...service, status, updatedAt: new Date().toISOString() }
          : service,
      ),
    );
  };

  const handleChannelChange = (id: string, channel: ReleaseChannel) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id
          ? { ...service, channel, updatedAt: new Date().toISOString() }
          : service,
      ),
    );
  };

  return (
    <section className="w-full rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Community maintained
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            A felhasználók becsületkassza alapon tudják jelezni, hogy az egyes
            Royal Delivery service-ek milyen állapotban vannak.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <StatCard label="Összes service" value={stats.total} />
          <StatCard label="Teljesen jó" value={stats.healthy} />
          <StatCard label="Kisebb probléma" value={stats.degraded} />
          <StatCard label="Down" value={stats.down} />
          <StatCard label="Fejlesztés alatt" value={stats.inDevelopment} />
          <StatCard label="BETA" value={stats.beta} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              {editingId ? "Service módosítása" : "Új service létrehozása"}
            </h3>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-medium text-slate-500 hover:text-slate-900"
              >
                Mégse
              </button>
            )}
          </div>

          <div className="space-y-4">
            <Field label="Service neve">
              <input
                value={draft.name}
                onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="pl. Admin API"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
              />
            </Field>

            <Field label="URL">
              <input
                value={draft.url}
                onChange={(e) => setDraft((prev) => ({ ...prev, url: e.target.value }))}
                placeholder="https://api.royaldelivery.hu"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
              />
            </Field>

            <Field label="Leírás">
              <textarea
                value={draft.description}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Rövid leírás a service-ről"
                rows={4}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Státusz">
                <select
                  value={draft.status}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      status: e.target.value as ServiceStatus,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
                >
                  {Object.entries(STATUS_META).map(([value, meta]) => (
                    <option key={value} value={value}>
                      {meta.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Verzió">
                <select
                  value={draft.channel}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      channel: e.target.value as ReleaseChannel,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500"
                >
                  <option value="stable">Nem béta</option>
                  <option value="beta">BETA</option>
                </select>
              </Field>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:translate-y-[-1px] hover:bg-slate-800"
            >
              {editingId ? "Módosítás mentése" : "Service hozzáadása"}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1.3fr_1fr_1fr]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Keresés név, URL vagy leírás alapján"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ServiceStatus | "all")}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
            >
              <option value="all">Minden státusz</option>
              {Object.entries(STATUS_META).map(([value, meta]) => (
                <option key={value} value={value}>
                  {meta.label}
                </option>
              ))}
            </select>

            <select
              value={filterChannel}
              onChange={(e) =>
                setFilterChannel(e.target.value as ReleaseChannel | "all")
              }
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
            >
              <option value="all">Minden verzió</option>
              <option value="stable">Nem béta</option>
              <option value="beta">BETA</option>
            </select>
          </div>

          <div className="grid gap-4">
            {filteredServices.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                Nincs a szűrésnek megfelelő service.
              </div>
            ) : (
              filteredServices.map((service) => {
                const statusMeta = STATUS_META[service.status];
                const channelMeta = CHANNEL_META[service.channel];

                return (
                  <article
                    key={service.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusMeta.badgeClass}`}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${statusMeta.dotClass}`}
                            />
                            {statusMeta.label}
                          </span>

                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${channelMeta.className}`}
                          >
                            {channelMeta.label}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-bold text-slate-900">
                          {service.name}
                        </h3>

                        {service.url && (
                          <a
                            href={service.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 block break-all text-sm text-sky-700 hover:underline"
                          >
                            {service.url}
                          </a>
                        )}

                        {service.description && (
                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            {service.description}
                          </p>
                        )}

                        <p className="mt-3 text-xs text-slate-400">
                          Utolsó módosítás: {new Date(service.updatedAt).toLocaleString("hu-HU")}
                        </p>
                      </div>

                      <div className="grid gap-3 lg:w-[260px]">
                        <select
                          value={service.status}
                          onChange={(e) =>
                            handleQuickStatusChange(
                              service.id,
                              e.target.value as ServiceStatus,
                            )
                          }
                          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
                        >
                          {Object.entries(STATUS_META).map(([value, meta]) => (
                            <option key={value} value={value}>
                              {meta.label}
                            </option>
                          ))}
                        </select>

                        <select
                          value={service.channel}
                          onChange={(e) =>
                            handleChannelChange(
                              service.id,
                              e.target.value as ReleaseChannel,
                            )
                          }
                          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500"
                        >
                          <option value="stable">Nem béta</option>
                          <option value="beta">BETA</option>
                        </select>

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => handleEdit(service)}
                            className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            Módosítás
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(service.id)}
                            className="rounded-2xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                          >
                            Törlés
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

type StatCardProps = {
  label: string;
  value: number;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
