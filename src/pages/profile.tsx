import Head from "next/head";

type Session = {
  id: string;
  device: string;
  browser: string;
  location: string;
  status: "Active" | "Idle" | "Expired";
};

type CryptoWallet = {
  id: string;
  type: string;
  address: string;
  balance: string;
};

type Transaction = {
  id: string;
  type: string;
  dateTime: string;
  amountUsd: number;
  status: "Completed" | "Pending" | "Failed";
};

type BankAccount = {
  id: string;
  bank: string;
  accountType: "Checking" | "Savings";
  last4: string;
  verification: "Verified" | "Pending";
};

type PaymentMethod = {
  id: string;
  cardType: string;
  last4: string;
  expiration: string;
  isDefault: boolean;
};

const profile = {
  fullName: "Jose Santiago Merino",
  email: "jose.santiago@eqdemo.com",
  phone: "+52 55 7123 4488",
  birthDate: "1994-07-12",
  city: "Ciudad de Mexico",
  state: "CDMX",
  country: "Mexico",
  availableCountries: [
    "Mexico",
    "United States",
    "Canada",
    "Colombia",
    "Spain",
    "Argentina",
  ],
};

const twoFactorEnabled = true;

const activeSessions: Session[] = [
  {
    id: "s-1",
    device: "MacBook Pro 14",
    browser: "Chrome 135",
    location: "CDMX, MX",
    status: "Active",
  },
  {
    id: "s-2",
    device: "iPhone 15",
    browser: "Safari iOS",
    location: "Monterrey, MX",
    status: "Idle",
  },
  {
    id: "s-3",
    device: "Dell XPS 13",
    browser: "Edge 134",
    location: "Bogota, CO",
    status: "Expired",
  },
];

const totalWalletBalanceUsd = 18420.76;

const connectedWallets: CryptoWallet[] = [
  {
    id: "w-1",
    type: "Bitcoin",
    address: "bc1q8x...u9x4",
    balance: "0.452 BTC",
  },
  {
    id: "w-2",
    type: "Ethereum",
    address: "0x91fD...a13b",
    balance: "3.281 ETH",
  },
  {
    id: "w-3",
    type: "USDC",
    address: "0x15Ae...f011",
    balance: "4,500 USDC",
  },
];

const recentTransactions: Transaction[] = [
  {
    id: "t-1",
    type: "Deposit",
    dateTime: "2026-03-18 14:22",
    amountUsd: 2500,
    status: "Completed",
  },
  {
    id: "t-2",
    type: "Investment Purchase",
    dateTime: "2026-03-17 09:44",
    amountUsd: -980,
    status: "Completed",
  },
  {
    id: "t-3",
    type: "Dividend Payment",
    dateTime: "2026-03-16 08:10",
    amountUsd: 120,
    status: "Pending",
  },
  {
    id: "t-4",
    type: "Withdrawal",
    dateTime: "2026-03-14 17:01",
    amountUsd: -300,
    status: "Failed",
  },
];

const linkedBankAccounts: BankAccount[] = [
  {
    id: "b-1",
    bank: "BBVA",
    accountType: "Checking",
    last4: "7321",
    verification: "Verified",
  },
  {
    id: "b-2",
    bank: "Santander",
    accountType: "Savings",
    last4: "4189",
    verification: "Pending",
  },
];

const paymentMethods: PaymentMethod[] = [
  {
    id: "pm-1",
    cardType: "Visa",
    last4: "2204",
    expiration: "06/28",
    isDefault: true,
  },
  {
    id: "pm-2",
    cardType: "Mastercard",
    last4: "9842",
    expiration: "11/27",
    isDefault: false,
  },
];

const notifications = {
  emailNotifications: true,
  investmentUpdates: true,
  dividendPayments: true,
  marketingPromotions: false,
  pushNotifications: true,
  smsNotifications: false,
};

const preferences = {
  language: "Espanol",
  availableLanguages: ["Espanol", "English", "Portugues"],
  displayCurrency: "USD",
  availableCurrencies: ["USD", "EUR", "MXN", "COP"],
  timezone: "America/Mexico_City",
  availableTimezones: [
    "America/Mexico_City",
    "America/New_York",
    "Europe/Madrid",
    "UTC",
  ],
  darkMode: true,
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function StatusPill({ label }: { label: string }) {
  const classes =
    label === "Active" || label === "Completed" || label === "Verified"
      ? "border-emerald-500/30 bg-emerald-500/12 text-emerald-300"
      : label === "Pending" || label === "Idle"
        ? "border-amber-500/30 bg-amber-500/12 text-amber-300"
        : "border-red-500/30 bg-red-500/12 text-red-300";

  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] ${classes}`}>
      {label}
    </span>
  );
}

function ToggleView({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`inline-flex min-w-14 items-center justify-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        enabled
          ? "bg-primary/20 text-primary border border-primary/35"
          : "bg-white/6 text-muted-foreground border border-border/50"
      }`}
    >
      {enabled ? "ON" : "OFF"}
    </span>
  );
}

export default function ProfilePage() {
  const initials = getInitials(profile.fullName);

  return (
    <>
      <Head>
        <title>Perfil - EQ</title>
      </Head>

      <div className="eq-page">
        <section className="eq-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Perfil
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Datos de usuario</h2>
            </div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-lg font-semibold text-primary">
              {initials}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Nombre completo" value={profile.fullName} />
            <Field label="Correo electronico" value={profile.email} />
            <Field label="Numero de telefono" value={profile.phone} />
            <Field label="Fecha de nacimiento" value={profile.birthDate} />
            <Field label="Ciudad" value={profile.city} />
            <Field label="Estado/Provincia" value={profile.state} />
            <Field label="Pais seleccionado" value={profile.country} />
            <div className="rounded-sm border border-border/45 bg-black/20 p-3 sm:col-span-2">
              <div className="text-[11px] text-muted-foreground">Paises disponibles</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {profile.availableCountries.map((country) => (
                  <span
                    key={country}
                    className={`rounded-full border px-2 py-0.5 text-[10px] ${
                      country === profile.country
                        ? "border-primary/35 bg-primary/15 text-primary"
                        : "border-border/50 bg-white/5 text-muted-foreground"
                    }`}
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="eq-card eq-section-line">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Seguridad</div>
          <div className="mt-4 flex items-center justify-between rounded-sm border border-border/40 bg-black/20 px-4 py-3">
            <div>
              <div className="text-xs text-muted-foreground">Two-Factor Authentication</div>
              <div className="mt-1 text-sm text-foreground">
                Estado: {twoFactorEnabled ? "Activado" : "Desactivado"}
              </div>
            </div>
            <ToggleView enabled={twoFactorEnabled} />
          </div>

          <div className="mt-4 overflow-x-auto rounded-sm border border-border/40">
            <table className="w-full min-w-[620px] text-left text-xs">
              <thead className="bg-white/5 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Dispositivo</th>
                  <th className="px-3 py-2 font-medium">Navegador</th>
                  <th className="px-3 py-2 font-medium">Ubicacion</th>
                  <th className="px-3 py-2 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {activeSessions.map((session) => (
                  <tr key={session.id} className="border-t border-border/25">
                    <td className="px-3 py-2 text-foreground">{session.device}</td>
                    <td className="px-3 py-2 text-muted-foreground">{session.browser}</td>
                    <td className="px-3 py-2 text-muted-foreground">{session.location}</td>
                    <td className="px-3 py-2">
                      <StatusPill label={session.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="eq-card eq-section-line">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Wallet</div>
          <div className="mt-3 rounded-sm border border-primary/30 bg-primary/8 px-4 py-3">
            <div className="text-xs text-muted-foreground">Balance total en USD</div>
            <div className="mt-1 text-2xl font-semibold text-primary">
              ${totalWalletBalanceUsd.toLocaleString("en-US", { maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <div className="rounded-sm border border-border/40 bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Wallets conectadas
              </div>
              <div className="mt-3 space-y-2">
                {connectedWallets.map((wallet) => (
                  <div
                    key={wallet.id}
                    className="rounded-sm border border-border/35 bg-black/25 p-3 text-xs"
                  >
                    <div className="font-medium text-foreground">{wallet.type}</div>
                    <div className="mt-1 text-muted-foreground">{wallet.address}</div>
                    <div className="mt-1 text-primary">{wallet.balance}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-sm border border-border/40 bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Transacciones recientes
              </div>
              <div className="mt-3 space-y-2">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="rounded-sm border border-border/35 bg-black/25 p-3 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-foreground">{transaction.type}</span>
                      <StatusPill label={transaction.status} />
                    </div>
                    <div className="mt-1 text-muted-foreground">{transaction.dateTime}</div>
                    <div
                      className={`mt-1 font-semibold ${
                        transaction.amountUsd >= 0 ? "text-emerald-300" : "text-red-300"
                      }`}
                    >
                      {transaction.amountUsd >= 0 ? "+" : "-"}$
                      {Math.abs(transaction.amountUsd).toLocaleString("en-US")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="eq-card eq-section-line">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Cuentas vinculadas
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <div className="rounded-sm border border-border/40 bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Cuentas bancarias
              </div>
              <div className="mt-3 space-y-2">
                {linkedBankAccounts.map((account) => (
                  <div key={account.id} className="rounded-sm border border-border/35 bg-black/25 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{account.bank}</span>
                      <StatusPill label={account.verification} />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {account.accountType} • •••• {account.last4}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-sm border border-border/40 bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Metodos de pago
              </div>
              <div className="mt-3 space-y-2">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="rounded-sm border border-border/35 bg-black/25 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {method.cardType} •••• {method.last4}
                      </span>
                      {method.isDefault ? (
                        <span className="rounded-full border border-primary/35 bg-primary/15 px-2 py-0.5 text-[10px] text-primary">
                          Predeterminada
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Expira: {method.expiration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="eq-card eq-section-line">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Notificaciones
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <SwitchLine label="Email Notifications" enabled={notifications.emailNotifications} />
            <SwitchLine label="Investment updates" enabled={notifications.investmentUpdates} />
            <SwitchLine label="Dividend payments" enabled={notifications.dividendPayments} />
            <SwitchLine label="Marketing promotions" enabled={notifications.marketingPromotions} />
            <SwitchLine label="Push Notifications" enabled={notifications.pushNotifications} />
            <SwitchLine label="SMS Notifications" enabled={notifications.smsNotifications} />
          </div>
        </section>

        <section className="eq-card eq-section-line">
          <div className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Preferencias
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <OptionList label="Idioma" selected={preferences.language} options={preferences.availableLanguages} />
            <OptionList
              label="Moneda de visualizacion"
              selected={preferences.displayCurrency}
              options={preferences.availableCurrencies}
            />
            <OptionList
              label="Zona horaria"
              selected={preferences.timezone}
              options={preferences.availableTimezones}
            />
            <div className="rounded-sm border border-border/45 bg-black/20 p-3">
              <div className="text-[11px] text-muted-foreground">Dark Mode</div>
              <div className="mt-2">
                <ToggleView enabled={preferences.darkMode} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-border/45 bg-black/20 p-3">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm text-foreground">{value}</div>
    </div>
  );
}

function SwitchLine({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="rounded-sm border border-border/45 bg-black/20 p-3">
      <div className="text-xs text-foreground">{label}</div>
      <div className="mt-2">
        <ToggleView enabled={enabled} />
      </div>
    </div>
  );
}

function OptionList({
  label,
  selected,
  options,
}: {
  label: string;
  selected: string;
  options: string[];
}) {
  return (
    <div className="rounded-sm border border-border/45 bg-black/20 p-3">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm text-foreground">Seleccionado: {selected}</div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((option) => (
          <span
            key={option}
            className={`rounded-full border px-2 py-0.5 text-[10px] ${
              option === selected
                ? "border-primary/35 bg-primary/15 text-primary"
                : "border-border/50 bg-white/5 text-muted-foreground"
            }`}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
}
