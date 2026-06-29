import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/6a68f2e9-4abd-409f-93d2-31b8246fe6c2/files/a359d060-dc0f-4979-8108-5f47cd3b9f00.jpg';

const NAV = [
  { id: 'calculator', label: 'Калькулятор' },
  { id: 'conditions', label: 'Условия' },
  { id: 'requirements', label: 'Требования' },
  { id: 'process', label: 'Как оформить' },
  { id: 'faq', label: 'Вопросы' },
  { id: 'contacts', label: 'Контакты' },
];

const fmt = (n: number) => n.toLocaleString('ru-RU');

const Index = () => {
  const [amount, setAmount] = useState(500000);
  const [term, setTerm] = useState(24);
  const rate = 11.9;

  const monthly = useMemo(() => {
    const m = rate / 100 / 12;
    const p = (amount * m) / (1 - Math.pow(1 + m, -term));
    return Math.round(p);
  }, [amount, term]);

  const total = monthly * term;
  const overpay = total - amount;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Icon name="Banknote" className="text-primary-foreground" size={20} />
            </div>
            <span className="font-display font-extrabold text-lg tracking-tight">КредитПро</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('calculator')} className="rounded-full font-semibold">
            Оформить заявку
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative grid-bg">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        <div className="container relative grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          <div className="animate-float-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Решение за 5 минут онлайн
            </div>
            <h1 className="font-display font-black text-5xl lg:text-7xl leading-[0.95] tracking-tight mb-6">
              Кредит на <span className="text-gradient">ваших</span> условиях
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              До 5 000 000 ₽ со ставкой от 11,9% годовых. Без справок и
              поручителей, с автоматической проверкой кредитной истории.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollTo('calculator')} className="rounded-full font-semibold h-14 px-8 text-base glow-primary">
                Рассчитать кредит
                <Icon name="ArrowRight" size={18} className="ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('conditions')} className="rounded-full font-semibold h-14 px-8 text-base">
                Условия
              </Button>
            </div>
            <div className="flex gap-8 mt-12">
              {[
                { v: '5 млн ₽', l: 'максимум' },
                { v: '11,9%', l: 'ставка от' },
                { v: '5 мин', l: 'одобрение' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display font-extrabold text-2xl">{s.v}</div>
                  <div className="text-sm text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="animate-float-up" style={{ animationDelay: '0.2s' }}>
            <img src={HERO_IMG} alt="Кредитование" className="w-full rounded-3xl glow-primary" />
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display font-black text-4xl lg:text-5xl mb-4">
              Калькулятор кредита
            </h2>
            <p className="text-primary-foreground/70 text-lg">
              Подвигайте ползунки и узнайте платёж за пару секунд.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-primary-foreground/10 backdrop-blur rounded-3xl p-8 border border-primary-foreground/20">
              <div className="mb-10">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Сумма кредита</span>
                  <span className="font-display font-bold text-xl">{fmt(amount)} ₽</span>
                </div>
                <Slider value={[amount]} min={50000} max={5000000} step={10000} onValueChange={(v) => setAmount(v[0])} />
                <div className="flex justify-between text-sm text-primary-foreground/60 mt-2">
                  <span>50 000 ₽</span>
                  <span>5 000 000 ₽</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Срок кредита</span>
                  <span className="font-display font-bold text-xl">{term} мес.</span>
                </div>
                <Slider value={[term]} min={6} max={84} step={1} onValueChange={(v) => setTerm(v[0])} />
                <div className="flex justify-between text-sm text-primary-foreground/60 mt-2">
                  <span>6 мес.</span>
                  <span>84 мес.</span>
                </div>
              </div>
            </div>
            <div className="bg-accent text-accent-foreground rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <div className="text-sm font-semibold opacity-70 mb-1">Ежемесячный платёж</div>
                <div className="font-display font-black text-5xl lg:text-6xl mb-8">{fmt(monthly)} ₽</div>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-accent-foreground/20 pb-3">
                    <span className="opacity-70">Ставка</span>
                    <span className="font-bold">{rate}% годовых</span>
                  </div>
                  <div className="flex justify-between border-b border-accent-foreground/20 pb-3">
                    <span className="opacity-70">Переплата</span>
                    <span className="font-bold">{fmt(overpay)} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Сумма к возврату</span>
                    <span className="font-bold">{fmt(total)} ₽</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="w-full mt-8 h-14 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base">
                Получить эти деньги
                <Icon name="ArrowRight" size={18} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CONDITIONS */}
      <section id="conditions" className="py-24">
        <div className="container">
          <h2 className="font-display font-black text-4xl lg:text-5xl mb-4">Условия и ставки</h2>
          <p className="text-muted-foreground text-lg max-w-xl mb-12">
            Прозрачные тарифы без скрытых комиссий — выбирайте подходящий продукт.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Потребительский', rate: '11,9%', sum: 'до 1 500 000 ₽', term: 'до 60 мес.', icon: 'Wallet', hot: false },
              { name: 'Крупный', rate: '13,5%', sum: 'до 5 000 000 ₽', term: 'до 84 мес.', icon: 'TrendingUp', hot: true },
              { name: 'Рефинансирование', rate: '10,5%', sum: 'до 3 000 000 ₽', term: 'до 72 мес.', icon: 'RefreshCw', hot: false },
            ].map((c) => (
              <div
                key={c.name}
                className={`rounded-3xl p-8 border transition-transform hover:-translate-y-1 ${
                  c.hot ? 'bg-primary text-primary-foreground border-primary glow-primary' : 'bg-card border-border'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${c.hot ? 'bg-accent text-accent-foreground' : 'bg-secondary text-primary'}`}>
                  <Icon name={c.icon} size={24} />
                </div>
                {c.hot && (
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-accent text-accent-foreground mb-3">
                    Популярный
                  </span>
                )}
                <h3 className="font-display font-extrabold text-2xl mb-1">{c.name}</h3>
                <div className="font-display font-black text-4xl mb-6">{c.rate}</div>
                <div className={`space-y-2 text-sm ${c.hot ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  <div className="flex items-center gap-2"><Icon name="Check" size={16} /> Сумма {c.sum}</div>
                  <div className="flex items-center gap-2"><Icon name="Check" size={16} /> Срок {c.term}</div>
                  <div className="flex items-center gap-2"><Icon name="Check" size={16} /> Без комиссий</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section id="requirements" className="py-24 bg-secondary/40">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-black text-4xl lg:text-5xl mb-4">Требования к заёмщику</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Минимум условий — оформить кредит может почти каждый совершеннолетний гражданин РФ.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: 'User', t: 'Возраст', d: 'от 21 до 70 лет' },
                { icon: 'Flag', t: 'Гражданство', d: 'РФ с пропиской' },
                { icon: 'Briefcase', t: 'Стаж', d: 'от 3 месяцев' },
                { icon: 'FileText', t: 'Документы', d: 'паспорт + СНИЛС' },
              ].map((r) => (
                <div key={r.t} className="bg-card rounded-2xl p-5 border border-border">
                  <Icon name={r.icon} size={22} className="text-primary mb-3" />
                  <div className="font-display font-bold">{r.t}</div>
                  <div className="text-sm text-muted-foreground">{r.d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 lg:p-10">
            <Icon name="ShieldCheck" size={32} className="text-accent mb-4" />
            <h3 className="font-display font-extrabold text-2xl mb-3">Проверка кредитной истории</h3>
            <p className="text-primary-foreground/70 mb-6">
              Мы автоматически интегрированы с банками и бюро кредитных историй —
              ваша заявка проверяется за секунды без лишних звонков.
            </p>
            <div className="space-y-3">
              {['Запрос в БКИ онлайн', 'Скоринг по 50+ параметрам', 'Подбор лучшего предложения банка'].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Icon name="Check" size={14} className="text-accent-foreground" />
                  </div>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24">
        <div className="container">
          <h2 className="font-display font-black text-4xl lg:text-5xl mb-12">Как оформить кредит</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: '01', t: 'Заявка', d: 'Заполните форму онлайн за 2 минуты', icon: 'PenLine' },
              { n: '02', t: 'Проверка', d: 'Автоматический скоринг и анализ КИ', icon: 'Search' },
              { n: '03', t: 'Одобрение', d: 'Решение от банков за 5 минут', icon: 'BadgeCheck' },
              { n: '04', t: 'Деньги', d: 'Перевод на карту в день обращения', icon: 'CreditCard' },
            ].map((s) => (
              <div key={s.n} className="relative bg-card rounded-3xl p-7 border border-border hover:border-primary transition-colors">
                <div className="font-display font-black text-5xl text-secondary mb-4">{s.n}</div>
                <div className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-4">
                  <Icon name={s.icon} size={20} />
                </div>
                <h3 className="font-display font-bold text-lg mb-1">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-secondary/40">
        <div className="container max-w-3xl">
          <h2 className="font-display font-black text-4xl lg:text-5xl mb-12 text-center">Частые вопросы</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: 'Как быстро рассмотрят мою заявку?', a: 'Предварительное решение приходит за 5 минут благодаря автоматической проверке кредитной истории и интеграции с банками.' },
              { q: 'Нужны ли справки о доходах?', a: 'Для большинства продуктов достаточно паспорта и СНИЛС. Справка о доходах может снизить ставку, но не обязательна.' },
              { q: 'Можно ли погасить кредит досрочно?', a: 'Да, досрочное погашение доступно в любой момент без штрафов и комиссий. Проценты пересчитываются автоматически.' },
              { q: 'Что влияет на одобрение?', a: 'Кредитная история, уровень дохода, текущая долговая нагрузка и стаж работы. Наш скоринг учитывает более 50 параметров.' },
              { q: 'Как я получу деньги?', a: 'После одобрения средства переводятся на вашу банковскую карту в день обращения.' },
            ].map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-2xl border border-border px-6">
                <AccordionTrigger className="font-display font-semibold text-left hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24">
        <div className="container">
          <div className="bg-primary text-primary-foreground rounded-[2rem] p-10 lg:p-16 grid lg:grid-cols-2 gap-12 items-center glow-primary">
            <div>
              <h2 className="font-display font-black text-4xl lg:text-5xl mb-4">Контакты и поддержка</h2>
              <p className="text-primary-foreground/70 text-lg mb-8">
                Остались вопросы? Наши специалисты на связи каждый день с 8:00 до 22:00.
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'Phone', t: '8 800 555-35-35', d: 'Бесплатно по России' },
                  { icon: 'Mail', t: 'help@kreditpro.ru', d: 'Ответим в течение часа' },
                  { icon: 'MapPin', t: 'Москва, ул. Финансовая, 1', d: 'Главный офис' },
                ].map((c) => (
                  <div key={c.t} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                      <Icon name={c.icon} size={22} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-lg">{c.t}</div>
                      <div className="text-sm text-primary-foreground/60">{c.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur rounded-3xl p-8 border border-primary-foreground/20 space-y-4">
              <h3 className="font-display font-extrabold text-2xl mb-2">Заявка на кредит</h3>
              <input className="w-full h-12 px-4 rounded-xl bg-primary-foreground text-foreground placeholder:text-muted-foreground outline-none" placeholder="Ваше имя" />
              <input className="w-full h-12 px-4 rounded-xl bg-primary-foreground text-foreground placeholder:text-muted-foreground outline-none" placeholder="Телефон" />
              <input className="w-full h-12 px-4 rounded-xl bg-primary-foreground text-foreground placeholder:text-muted-foreground outline-none" placeholder="Желаемая сумма, ₽" />
              <Button size="lg" className="w-full h-14 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base">
                Отправить заявку
              </Button>
              <p className="text-xs text-primary-foreground/50 text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Banknote" className="text-primary-foreground" size={18} />
            </div>
            <span className="font-display font-extrabold">КредитПро</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 КредитПро. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
