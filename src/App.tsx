import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'

const RED = '#E50914'
const TIFFANY = '#0ABAB5'

const SLIDES = [
  {
    id: 1,
    type: 'TITLE',
    title: '5 ВЕЩЕЙ',
    subtitle: 'которые AI делает за тебя, пока ты пьёшь кофе',
    tagline: '@IRA.AND.AI',
    backgroundGif: 'https://media.giphy.com/media/l4FGquSwfx52EPXzO/giphy.gif',
  },
  {
    id: 2,
    type: 'HOOK',
    title: 'ЗНАКОМО?',
    lines: [
      '100 вкладок в браузере.',
      '47 задач в списке.',
      '3 дедлайна горят.',
      'А кофе уже остыл.',
    ],
    punchline: 'Что если часть из этого можно было просто… не делать самой?',
  },
  {
    id: 3,
    type: 'STAT',
    title: 'ФАКТ',
    bigNumber: '45%',
    bigLabel: 'сотрудников уже используют AI на работе',
    stats: [
      { value: '40–60', unit: 'мин / день', label: 'экономия времени' },
      { value: '$4.4', unit: 'трлн', label: 'рост производительности к 2030' },
    ],
    source: 'Qualtrics 2025, McKinsey Global Institute',
  },
  {
    id: 4,
    type: 'THING',
    num: '01',
    title: 'РАЗБИРАЕТ ПОЧТУ',
    description: 'Пока ты наливаешь первую чашку — AI уже прочитал 47 писем, выделил 3 важных и написал черновики ответов.',
    tools: 'Gemini в Gmail (кнопка «Help me write»), ChatGPT — вставить текст и попросить рассортировать',
    prompt: '«Я скопировала тебе 20 последних писем из рабочей почты. Рассортируй:\n🔴 Срочно — нужен ответ сегодня (напиши черновик ответа на каждое)\n🟡 На этой неделе — могу отложить, но не забыть\n⚪ Информационный шум — можно удалить\nФормат: таблица. Для срочных — готовый текст ответа, короткий, деловой, на вы.»',
    time: '30 сек вместо 40 мин',
    color: RED,
  },
  {
    id: 5,
    type: 'THING',
    num: '02',
    title: 'ПИШЕТ ТЕКСТЫ',
    description: 'Пост в Telegram, письмо клиенту, описание продукта. Первый черновик — за 30 секунд. Тебе останется только поправить.',
    tools: 'ChatGPT (быстрые черновики), Claude (длинные тексты, стиль), Notion AI (прямо внутри заметок)',
    prompt: '«Ты — копирайтер для Telegram-канала про [тема]. Аудитория: [кто они, возраст, боль].\nНапиши пост на тему: [тема поста].\nСтруктура: хук (вопрос или провокация) → основная мысль в 3-4 предложениях → вывод с пользой.\nТон: разговорный, на вы, без восклицательных знаков и мотивационных клише.\nДлина: 800-1000 знаков. Без эмодзи в тексте, один в конце если уместно.»',
    time: '1 мин вместо 45 мин',
    color: TIFFANY,
  },
  {
    id: 6,
    type: 'THING',
    num: '03',
    title: 'ПЛАНИРУЕТ ДЕНЬ',
    description: 'Скидываешь список дел — получаешь расписание с приоритетами. AI видит, что у тебя созвон в 14:00 и дедлайн в пятницу.',
    tools: 'ChatGPT (скинуть список → получить план), Notion AI, Google Calendar + Gemini',
    prompt: '«Вот мои задачи на сегодня: [вставить список].\nОграничения: с 9 до 18, обед 13:00-14:00, созвон в [время].\nРаздели на блоки по 45-60 минут. Сложное — на утро, рутину — после обеда.\nЕсли задач больше чем влезает в день — скажи что убрать и почему.\nФормат: таблица с колонками Время | Задача | Почему сейчас.»',
    time: '10 сек вместо 20 мин',
    color: RED,
  },
  {
    id: 7,
    type: 'THING',
    num: '04',
    title: 'ИЩЕТ И АНАЛИЗИРУЕТ',
    description: 'Изучить конкурента? Найти статистику? Разобрать тренд? Раньше — 2 часа гугления. Теперь — один запрос.',
    tools: 'Perplexity (поиск с источниками), ChatGPT с browsing, Claude (анализ документов до 200 стр.)',
    prompt: '«Я [кто ты и чем занимаешься]. Мне нужно разобраться в теме: [тема].\nНайди 5 ключевых фактов/трендов за последние 3 месяца.\nК каждому: источник (ссылка), одна цифра или факт, и одно предложение — почему это важно для моей работы.\nФормат: нумерованный список. Без воды, только то, что я могу использовать в работе или контенте.»',
    time: '2 мин вместо 2 часов',
    color: TIFFANY,
  },
  {
    id: 8,
    type: 'THING',
    num: '05',
    title: 'ДЕЛАЕТ РУТИНУ КРАСИВОЙ',
    description: 'Презентация, таблица, чек-лист — не стыдно показать клиенту.',
    tools: 'Gamma (презентации за 2 мин), ChatGPT Canvas (документы), Claude Artifacts (таблицы, чек-листы)',
    prompt: '«Сделай [презентацию / чек-лист / таблицу] на тему: [тема].\nАудитория: [кто будет смотреть]. Цель: [что они должны понять/сделать после].\nСтруктура: [количество] слайдов/пунктов. На каждом — один тезис, максимум 2 предложения.\nСтиль: минимализм, как будто делал дизайнер. Никаких буллетпоинтов на 10 строк.\nДай текст для каждого слайда отдельно, с пометкой что на нём визуально.»',
    time: '5 мин вместо 3 часов',
    color: RED,
  },
  {
    id: 9,
    type: 'MATH',
    title: 'СЧИТАЕМ',
    calculation: [
      { label: '5 задач', symbol: '×' },
      { label: '30 мин каждая', symbol: '=' },
      { label: '2.5 часа / день', symbol: '' },
    ],
    result: '50 часов в месяц',
    punchline: 'Это целая рабочая неделя. Каждый месяц. Бесплатно.',
  },
  {
    id: 10,
    type: 'CTA',
    title: 'ХОЧЕШЬ ТАК ЖЕ?',
    subtitle: 'Подпишись на @ira.and.ai — покажу, как начать с одной задачи',
    footer: 'Готово лучше, чем идеально 🍸',
  },
]

function App() {
  const [current, setCurrent] = useState(0)
  const [printMode, setPrintMode] = useState(false)
  const slide = SLIDES[current]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (printMode) return
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrent(c => Math.min(c + 1, SLIDES.length - 1))
      }
      if (e.key === 'ArrowLeft') {
        setCurrent(c => Math.max(c - 1, 0))
      }
      if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setPrintMode(true)
        setTimeout(() => {
          window.print()
          setPrintMode(false)
        }, 100)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [printMode])

  // Print mode: show all slides stacked
  if (printMode) {
    return (
      <div className="bg-[#0A0A0A] print-mode">
        {SLIDES.map((s) => (
          <div key={s.id} className="print-slide">
            {renderSlide(s)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-[#E50914]"
          animate={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide counter */}
      <div className="fixed top-6 right-8 z-50 text-gray-500 text-sm font-mono">
        {current + 1} / {SLIDES.length}
      </div>

      {/* PDF button */}
      <button
        onClick={() => {
          setPrintMode(true)
          setTimeout(() => {
            window.print()
            setPrintMode(false)
          }, 100)
        }}
        className="fixed top-6 left-8 z-50 text-gray-600 hover:text-white text-xs uppercase tracking-wider transition-colors print:hidden"
      >
        PDF
      </button>

      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {renderSlide(slide)}
        </motion.div>
      </AnimatePresence>

      {/* Click areas for navigation */}
      <div
        className="fixed left-0 top-0 w-1/3 h-full cursor-w-resize z-40"
        onClick={() => setCurrent(c => Math.max(c - 1, 0))}
      />
      <div
        className="fixed right-0 top-0 w-1/3 h-full cursor-e-resize z-40"
        onClick={() => setCurrent(c => Math.min(c + 1, SLIDES.length - 1))}
      />
    </div>
  )
}

function renderSlide(slide: (typeof SLIDES)[number]) {
  return (
    <>
      {/* TITLE SLIDE */}
      {slide.type === 'TITLE' && (
        <div className="relative w-full h-full film-grain">
          {'backgroundGif' in slide && slide.backgroundGif && (
            <>
              <img src={slide.backgroundGif} className="absolute inset-0 w-full h-full object-cover grayscale print:hidden" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
            </>
          )}
          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 pb-20">
            {'tagline' in slide && slide.tagline && (
              <p className="text-[#E50914] text-sm tracking-[0.3em] uppercase mb-4">
                {slide.tagline}
              </p>
            )}
            <h1 className="font-display text-7xl md:text-[10rem] font-black text-white uppercase tracking-wide leading-none">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-xl md:text-3xl text-gray-300 mt-4 max-w-2xl">
                {slide.subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* HOOK SLIDE */}
      {slide.type === 'HOOK' && (
        <div className="w-full h-full flex flex-col justify-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
          <h2 className="font-display text-5xl md:text-8xl font-black text-[#E50914] uppercase mb-12">
            {slide.title}
          </h2>
          <div className="space-y-4 max-w-3xl mb-12">
            {'lines' in slide && slide.lines?.map((line: string, i: number) => (
              <p key={i} className="text-white text-2xl md:text-4xl font-light">
                {line}
              </p>
            ))}
          </div>
          {'punchline' in slide && (
            <div className="border-l-4 border-[#0ABAB5] pl-6 max-w-2xl">
              <p className="text-[#0ABAB5] text-xl md:text-2xl italic">
                {slide.punchline}
              </p>
            </div>
          )}
        </div>
      )}

      {/* STAT SLIDE */}
      {slide.type === 'STAT' && (
        <div className="w-full h-full flex flex-col justify-center items-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
          <p className="text-[#E50914] text-sm tracking-[0.3em] uppercase mb-6">
            {slide.title}
          </p>
          {'bigNumber' in slide && (
            <div className="text-center mb-12">
              <span className="font-display text-8xl md:text-[12rem] font-black text-white leading-none">
                {slide.bigNumber}
              </span>
              <p className="text-gray-400 text-xl md:text-2xl mt-2">
                {'bigLabel' in slide && slide.bigLabel}
              </p>
            </div>
          )}
          <div className="flex gap-8 md:gap-16">
            {'stats' in slide && slide.stats?.map((stat: { value: string; unit: string; label: string }, i: number) => (
              <div key={i} className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`font-display text-4xl md:text-6xl font-black ${i === 0 ? 'text-[#0ABAB5]' : 'text-[#E50914]'}`}>
                    {stat.value}
                  </span>
                  <span className="text-gray-400 text-lg">{stat.unit}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          {'source' in slide && (
            <p className="text-gray-600 text-xs mt-12">
              {slide.source}
            </p>
          )}
        </div>
      )}

      {/* THING SLIDE */}
      {slide.type === 'THING' && (
        <div className="w-full h-full flex flex-col justify-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="font-display text-6xl md:text-8xl font-black"
              style={{ color: 'color' in slide ? (slide as any).color : RED }}
            >
              {'num' in slide && slide.num}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white uppercase">
              {slide.title}
            </h2>
          </div>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mb-4 leading-relaxed">
            {'description' in slide && slide.description}
          </p>

          {'tools' in slide && (
            <p className="text-gray-500 text-sm mb-6 max-w-3xl">
              <span className="text-[#0ABAB5] font-bold uppercase tracking-wider text-xs">Чем: </span>
              {slide.tools}
            </p>
          )}

          {'prompt' in slide && (
            <div
              className="bg-[#1a1a1a] border-l-4 rounded-r-lg p-5 max-w-3xl mb-6"
              style={{ borderColor: 'color' in slide ? (slide as any).color : RED }}
            >
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Промпт — скопируй и вставь</p>
              <p className="text-white text-sm md:text-base whitespace-pre-line leading-relaxed">{slide.prompt}</p>
            </div>
          )}

          {'time' in slide && (
            <div className="flex items-center gap-3">
              <span className="text-2xl">☕</span>
              <span className="text-[#0ABAB5] text-lg font-bold">{'time' in slide && slide.time}</span>
            </div>
          )}
        </div>
      )}

      {/* MATH SLIDE */}
      {slide.type === 'MATH' && (
        <div className="w-full h-full flex flex-col justify-center items-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
          <p className="text-[#E50914] text-sm tracking-[0.3em] uppercase mb-12">
            {slide.title}
          </p>
          <div className="flex items-center gap-4 md:gap-8 mb-12 flex-wrap justify-center">
            {'calculation' in slide && slide.calculation?.map((item: { label: string; symbol: string }, i: number) => (
              <div key={i} className="flex items-center gap-4 md:gap-8">
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-6 py-4 text-center">
                  <span className="text-white text-xl md:text-3xl font-bold">{item.label}</span>
                </div>
                {item.symbol && (
                  <span className="text-gray-500 text-3xl md:text-5xl font-light">{item.symbol}</span>
                )}
              </div>
            ))}
          </div>
          {'result' in slide && (
            <div className="text-center">
              <span className="font-display text-5xl md:text-8xl font-black text-[#0ABAB5] uppercase">
                {slide.result}
              </span>
            </div>
          )}
          {'punchline' in slide && (
            <p className="text-gray-400 text-xl md:text-2xl mt-8 text-center max-w-xl">
              {slide.punchline}
            </p>
          )}
        </div>
      )}

      {/* CTA SLIDE */}
      {slide.type === 'CTA' && (
        <div className="w-full h-full flex items-center justify-center bg-[#0A0A0A] p-8 film-grain">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-8xl font-black text-[#E50914] uppercase">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-xl md:text-3xl text-gray-300 mt-6 max-w-2xl mx-auto">
                {slide.subtitle}
              </p>
            )}
            {'footer' in slide && slide.footer && (
              <p className="text-2xl md:text-4xl mt-12 text-[#0ABAB5]">
                {slide.footer}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default App
