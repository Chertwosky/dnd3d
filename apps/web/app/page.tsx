const features = [
  'Персонажи и импорт JSON',
  'Кампании, карта и токены',
  'Броски кубов и справочник',
  'Простой 3D-аватар',
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-obsidian px-6 py-16 text-parchment">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <p className="text-sm uppercase tracking-[0.4em] text-amber-300">DnD 3D</p>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">DnD 3D — цифровой стол для MVP-кампаний</h1>
          <p className="max-w-2xl text-lg text-stone-300">
            Базовое frontend-приложение готово для подключения листов персонажей, справочника,
            бросков кубов, карты кампании и 3D-представления героя.
          </p>
        </div>
        <ul className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <li key={feature} className="rounded-2xl border border-amber-300/20 bg-white/5 p-5">
              {feature}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
