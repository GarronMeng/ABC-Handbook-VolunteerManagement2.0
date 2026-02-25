import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import {
  Zap,
  Target,
  Heart,
  BookOpen,
  MessageSquare,
  Activity,
  Menu,
  X,
  ChevronRight,
  Info
} from "lucide-react";

const FORMULA_DATA = [
  {
    id: "autonomy",
    title: "自主感",
    icon: <Zap className="w-6 h-6" />,
    description: "人们觉得自己的行为是自发的，是出于自己的选择。",
    details: [
      "身体健康、精力重组",
      "自己把握时间和空间",
      "可以规划和自我管理",
      "能够调整自己的情绪",
      "有梦想可以去实现",
      "拥有能力解决自己的混乱和冲突状态",
    ],
  },
  {
    id: "competence",
    title: "胜任感",
    icon: <Target className="w-6 h-6" />,
    description: "对行为或行动达到某个水平的信念，相信自己可以胜任该活动。",
    details: [
      "持续积累知识、扩张认知边界",
      "提升技能产出成果",
      "创业成功、完成大型项目",
      "解决复杂问题、获得专业成就",
      "职务提升、收益增长",
      "影响力提升",
    ],
  },
  {
    id: "belonging",
    title: "归属感",
    icon: <Heart className="w-6 h-6" />,
    description: "希望自己和他人有关联，希望在意他人，也能得到他人在意的感受。",
    details: [
      "从家庭获得关爱",
      "从导师获得指导",
      "从团队获得支持",
      "从朋友获得理解",
      "从同侪获得认同",
      "体验到归属感",
    ],
  },
];

const TIMELINE_DATA = [
  {
    stage: "项目候选",
    touchpoint: "预触点 / 首触点",
    focus: "第一印象",
    desc: "如项目开始前的面试、训练营阶段，乃至于更早期的宣讲会，决定志愿者对ABC的第一印象。",
  },
  {
    stage: "项目团队",
    touchpoint: "核心触点",
    focus: "胜任感",
    desc: "随着项目季时间变化，逐渐形成“认知上升-投入下降”的剪刀差。",
  },
  {
    stage: "管理团队",
    touchpoint: "核心触点",
    focus: "胜任感与归属感",
    desc: "对于ABC的身份认同也会面临“挑战-巩固-再挑战”的过程。",
  },
  {
    stage: "校友社群",
    touchpoint: "末触点",
    focus: "获得感与归属感",
    desc: "关注获得感，同时关键志愿者的归属感也非常重要。",
  },
];

const JOURNEY_STEPS = [
  {
    num: "01",
    title: "设定研究场景",
    desc: "颗粒度决定了画布大小，在实际应用中我们只会拿其中1-3个场景来用。",
  },
  {
    num: "02",
    title: "拆分行为及触点",
    desc: "“触点”（touchpoint）是我们改善的核心抓手。",
  },
  {
    num: "03",
    title: "识别痛点和问题点",
    desc: "在商业场景中会还讨论典型客户的情绪。",
  },
  {
    num: "04",
    title: "提出改善方案建议",
    desc: "在此环节想法越多越好，no judge。",
  },
  {
    num: "05",
    title: "排列优先级并试点",
    desc: "可以先从询问真实志愿者的“思想实验”开始。",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "核心动力", href: "#formula" },
    { name: "体验特征", href: "#concepts" },
    { name: "时间线", href: "#timeline" },
    { name: "旅程地图", href: "#journey" },
    { name: "实践指南", href: "#practices" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-lg shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group">
          <span
            className={`text-2xl font-bold tracking-tighter font-serif transition-colors duration-300 ${
              scrolled ? "text-[#1100B9]" : "text-white"
            }`}
          >
            <span className="text-[#FFD500]">ABC</span> 美好社会咨询社
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-[#FFD500] ${
                scrolled ? "text-gray-600" : "text-white/80"
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#practices"
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              scrolled
                ? "bg-[#1100B9] text-white hover:bg-[#1100B9]/90"
                : "bg-white text-[#1100B9] hover:bg-white/90"
            }`}
          >
            开始探索
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 transition-colors duration-300 ${
            scrolled ? "text-[#1100B9]" : "text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 font-medium py-2 border-b border-gray-50 hover:text-[#1100B9]"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const yText = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#1100B9] text-white overflow-hidden">
      <motion.div 
        style={{ y: yBg }}
        className="absolute top-0 left-0 w-full h-full overflow-hidden z-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[#FFD500] opacity-20 blur-3xl"
        />
      </motion.div>

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#FFD500] font-mono tracking-widest uppercase mb-6 text-sm md:text-base"
        >
          A Better Community, A Better Us
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight font-serif"
        >
          志愿者管理新驱动力
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD500] to-yellow-200 italic">
            体验之道
          </span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light">
            从“交付为本”到“体验为本”，探索NGO与社会企业可持续发展的核心引擎。
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase mb-2 font-mono">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-[#FFD500]"
          />
        </div>
      </motion.div>
    </section>
  );
};

const FormulaSection = () => {
  return (
    <section id="formula" className="py-24 bg-[#F8F9FA] text-[#1A1A1A] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight font-serif">
            为什么志愿者总是
            <br />
            <span className="text-[#1100B9]">招不来、用不好、留不住？</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            即便是志愿者能力画像和价值观都相对契合的前提下，仍会面临志愿者缺乏动力和责任心的情况。根因在于我们往往只看重志愿服务的结果，而没有真正把志愿者视作平等参与的独立个体。当志愿者在利他过程中未获得足够的尊重与能动性，内心动力的引擎就会逐渐熄火。
          </p>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-[#1100B9] mb-2 font-serif">志愿者体验为本，还是客户体验/项目交付为本？</h4>
            <p className="text-sm text-gray-600">
              作为企业，服务好客户、为股东赚取利润是首要任务。但是作为NGO和社会企业，包括志愿者和客户在内的利益相关方都需要被重视，其中<strong>志愿者作为项目服务交付的主体</strong>，在组织的可持续发展进程中扮演着重要因素。一旦志愿者体验出现问题，将会出现滑坡式的“不断救火 -&gt; 加倍burnout”的恶劣结果。
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">
              核心动力公式
            </p>
            <h3 className="text-3xl md:text-4xl font-bold font-serif italic text-[#1100B9]">
              自主性 = f (自主感, 胜任感, 归属感)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FORMULA_DATA.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative p-8 rounded-2xl bg-[#F8F9FA] hover:bg-[#1100B9] transition-colors duration-500 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1100B9] mb-6 group-hover:text-[#FFD500] transition-colors duration-500 shadow-sm">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-500 font-serif">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-6 group-hover:text-white/80 transition-colors duration-500 h-16">
                    {item.description}
                  </p>
                  <ul className="space-y-2">
                    {item.details.slice(0, 4).map((detail, i) => (
                      <li
                        key={i}
                        className="text-xs text-gray-500 flex items-start group-hover:text-white/60 transition-colors duration-500"
                      >
                        <span className="mr-2 text-[#FFD500]">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ConceptsSection = () => {
  const CONCEPTS = [
    { title: '主观的', desc: '具有光环效应、从众效应和峰终效应等认知偏好，我们需要认知并加以利用。', icon: '🧠' },
    { title: '意义导向的', desc: '始终围绕着价值判断、价值选择和价值创造展开，这是志愿者体验的核心目的。', icon: '🎯' },
    { title: '多维度的', desc: '可以是感官的、物质的、情感的、认知的、行为的，体验提升离不开多元丰富的形式。', icon: '🌌' },
    { title: '多态度的', desc: '可能会有正面的、负面的、中性的等不同类型，因此差评管理也是体验管理必备功课。', icon: '🎭' },
    { title: '多尺度的', desc: '可以是短暂的、一次性的，也可以是长期的、连续的，因此需要统筹规划、交错安排。', icon: '📏' }
  ];

  return (
    <section id="concepts" className="py-24 bg-white text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight font-serif">
            什么是<span className="text-[#1100B9]">志愿者体验？</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            志愿者体验不仅仅是完成任务，它是一个复杂的、多层次的心理与行为过程。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {CONCEPTS.map((concept, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-64 [perspective:1000px]"
            >
              <div className="w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] relative">
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-[#F8F9FA] border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                  <div className="text-4xl mb-4">{concept.icon}</div>
                  <h3 className="text-xl font-bold font-serif text-[#1100B9]">{concept.title}</h3>
                  <div className="mt-4 text-xs text-gray-400 font-mono uppercase tracking-widest flex items-center gap-1">
                    <Info className="w-3 h-3" /> 悬停查看
                  </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-[#1100B9] text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] shadow-lg">
                  <h3 className="text-lg font-bold font-serif mb-3 text-[#FFD500]">{concept.title}</h3>
                  <p className="text-sm leading-relaxed text-white/90">{concept.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#F8F9FA] p-8 rounded-3xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold font-serif text-[#1100B9] mb-6">志愿者体验提升计划<span className="text-red-500">不是</span>什么：</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-600"><X className="w-5 h-5 text-red-500 mr-3" /> 不等于办活动、送礼物</li>
              <li className="flex items-center text-gray-600"><X className="w-5 h-5 text-red-500 mr-3" /> 不等于发问卷、做调研</li>
              <li className="flex items-center text-gray-600"><X className="w-5 h-5 text-red-500 mr-3" /> 不等于发祝福、水群</li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#1100B9] p-8 rounded-3xl text-white shadow-lg"
          >
            <h3 className="text-2xl font-bold font-serif text-[#FFD500] mb-6">志愿者体验提升计划<span className="text-white">是</span>什么：</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-white/90"><div className="w-1.5 h-1.5 rounded-full bg-[#FFD500] mt-2 mr-3 flex-shrink-0" /> 是一个项目集，需要规划短中长期的项目管理和行动策略</li>
              <li className="flex items-start text-white/90"><div className="w-1.5 h-1.5 rounded-full bg-[#FFD500] mt-2 mr-3 flex-shrink-0" /> 是一把手工程，公益机构负责人必须重视、支持并且以身作则</li>
              <li className="flex items-start text-white/90"><div className="w-1.5 h-1.5 rounded-full bg-[#FFD500] mt-2 mr-3 flex-shrink-0" /> 必须依赖于社群共创开展，需要倾听组织内的每位个体的声音</li>
              <li className="flex items-start text-white/90"><div className="w-1.5 h-1.5 rounded-full bg-[#FFD500] mt-2 mr-3 flex-shrink-0" /> 必须体现为客观、真实、可衡量的量化数据，才能推动共识和改变</li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl font-serif italic text-gray-500 max-w-3xl mx-auto">
            “如果你不能衡量它，你就无法管理它。”
            <span className="block text-sm font-sans not-italic mt-2 text-gray-400">— 这句格言在彼得·德鲁克的名言列表中排名很高，尽管他从未说过</span>
          </p>
        </div>
      </div>
    </section>
  );
};

const TimelineSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section id="timeline" className="py-24 bg-[#F8F9FA] text-[#1A1A1A]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <div className="sticky top-24">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight font-serif">
                志愿者体验
                <br />
                <span className="text-[#1100B9]">时间线</span>
              </h2>
              <p className="text-gray-600 mb-8">
                体验是主观的、意义导向的、多维度的。我们需要在志愿者生命周期的不同阶段，设计差异化的体验触点。
              </p>
              <div className="hidden md:block w-full h-[1px] bg-gray-200 relative">
                <motion.div 
                  style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                  className="absolute top-0 left-0 w-full h-full bg-[#FFD500]"
                />
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="space-y-12 relative">
              <div className="hidden md:block absolute left-[-2rem] top-0 bottom-0 w-[2px] bg-gray-200 origin-top">
                <motion.div 
                  style={{ scaleY }}
                  className="w-full h-full bg-[#1100B9] origin-top"
                />
              </div>

              {TIMELINE_DATA.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-8 md:pl-0"
                >
                  <div className="md:hidden absolute left-0 top-0 bottom-0 w-[2px] bg-gray-100">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#1100B9]"></div>
                  </div>

                  <div className="hidden md:block absolute left-[-2rem] top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#1100B9] z-10"></div>

                  <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#1100B9]/30 hover:shadow-md transition-all duration-300 group">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-[#1100B9] font-serif group-hover:text-[#FFD500] transition-colors">
                        {item.stage}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-[#FFD500]/20 text-[#1100B9] text-xs font-bold tracking-wider uppercase">
                        {item.touchpoint}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 font-mono">
                      关注点：{item.focus}
                    </p>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const JourneyMapSection = () => {
  return (
    <section id="journey" className="py-24 bg-[#1100B9] text-white relative overflow-hidden">
      {/* Background Parallax Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full border border-white/20"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border border-white/20"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
            用户体验旅程地图
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            从用户角度出发，以叙述故事的方式描述用户接受服务的体验情况，发现痛点和满意点，提炼优化机会。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
          {JOURNEY_STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {index < JOURNEY_STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-[1px] bg-white/20"></div>
              )}

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full backdrop-blur-sm hover:bg-white/10 transition-colors relative z-10">
                <div className="text-4xl font-serif italic text-[#FFD500] mb-4 opacity-80">
                  {step.num}
                </div>
                <h4 className="text-lg font-bold mb-3">{step.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PracticesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "候选体验", subtitle: "训练营产品化" },
    { title: "团队体验", subtitle: "积分体系与问卷" },
    { title: "社群体验", subtitle: "矩阵运营与微创新" },
  ];

  return (
    <section className="py-24 bg-[#F8F9FA] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight font-serif">
            体验提升<span className="text-[#1100B9]">实践指南</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/4 flex flex-col gap-2">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 ${
                  activeTab === idx
                    ? "bg-[#1100B9] text-white shadow-lg scale-105 origin-left"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`text-xs font-bold uppercase tracking-widest mb-2 font-mono ${activeTab === idx ? "text-[#FFD500]" : "text-gray-400"}`}
                >
                  {tab.title}
                </div>
                <div
                  className={`font-bold text-lg font-serif ${activeTab === idx ? "text-white" : "text-[#1A1A1A]"}`}
                >
                  {tab.subtitle}
                </div>
              </button>
            ))}
          </div>

          <div className="lg:w-3/4 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div
                  key="tab0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-[#1100B9] mb-4 font-serif">
                      训练营产品化持续复盘迭代
                    </h3>
                    <p className="text-gray-600 mb-6">
                      通过充分的信息公开和Guideline，提升志愿者（包括候选人、VM伙伴及面试官、观察员）的自主感。
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-50">
                        <h4 className="font-bold mb-2 flex items-center">
                          <BookOpen className="w-5 h-5 mr-2 text-[#FFD500]" />{" "}
                          宣讲会筹备全程SOP化
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          把企业宣讲会作为产品打造，使得与合作方沟通时在同一个界面上。
                        </p>
                        <div className="text-xs font-mono bg-white px-3 py-2 rounded text-[#1100B9] inline-block">
                          成效：筹备时间从2周缩短至最快3天
                        </div>
                      </div>
                      <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-50">
                        <h4 className="font-bold mb-2 flex items-center">
                          <MessageSquare className="w-5 h-5 mr-2 text-[#FFD500]" />{" "}
                          公开自助答疑文档
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          作为每一个招募答疑环节群公告和必读项，志愿者问题一键回复。
                        </p>
                        <div className="text-xs font-mono bg-white px-3 py-2 rounded text-[#1100B9] inline-block">
                          成效：大量节约答疑伙伴时间，减少流程疑问
                        </div>
                      </div>
                      <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-50 md:col-span-2">
                        <h4 className="font-bold mb-2 flex items-center">
                          <Target className="w-5 h-5 mr-2 text-[#FFD500]" />{" "}
                          面试全流程SOP化
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          面对3组以上同时并发的主持和面试官需求，解决如何快速培训上岗的挑战。
                        </p>
                        <div className="text-xs font-mono bg-white px-3 py-2 rounded text-[#1100B9] inline-block">
                          成效：从未负责过该阶段的VM伙伴，在30分钟培训后即可自主完成面试全环节
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div
                  key="tab1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-[#1100B9] mb-4 font-serif">
                      项目志愿者积分体系
                    </h3>
                    <p className="text-gray-600 mb-6">
                      以积分体系为明线，体验监测为暗线，串联起整个项目季志愿者体验流。
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-100">
                        <h4 className="font-bold text-[#1100B9] mb-3">设计逻辑与亮点</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-[#FFD500] mr-2">■</span>
                            <span><strong>引导行为：</strong>通过积分引导“好”行为（线下出席、社交活动、内推）加分，“坏”行为（不填问卷、迟交材料）减分。</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#FFD500] mr-2">■</span>
                            <span><strong>持续激励：</strong>通过游戏化手段（积分、证书、排行榜）持续激励 Top Performer。</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#FFD500] mr-2">■</span>
                            <span><strong>降低门槛：</strong>Coffee Chat 提供随机社交机会，挖掘兴趣点（多元社群圈粉）。</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-100">
                        <h4 className="font-bold text-[#1100B9] mb-3">成效与反思</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-[#1100B9] mr-2">✓</span>
                            <span>问卷回收率、汇报材料准时提交率显著提高；团队线下社交凝聚感增强。</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#1100B9] mr-2">✓</span>
                            <span>每季30%获得周边及奖品，作为“自来水”吸引圈层好友加入。</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-400 mr-2">!</span>
                            <span>反思：仍需进一步简化规则、降低门槛；奖品多元化，避免“唯分数论”。</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-[#1100B9] mb-4 font-serif">
                      项目季全员双周问卷
                    </h3>
                    <div className="bg-[#F8F9FA] p-6 rounded-xl border border-gray-100 mb-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2">问卷设置</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            10题以内，3分钟左右填写量，减轻负担。匿名填写，保护隐私、畅所欲言。通过积分规则，保证全组填写率不低于80%。
                          </p>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2">问卷成效</h4>
                          <p className="text-sm text-gray-600">
                            持续发送6季识别出项目进度和体验反馈。例如：管理团队“救火”成效明显、某个项目组平均工作投入时间偏高、活动供给与需求不匹配等。
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center text-sm font-bold text-[#1100B9]">
                        <Activity className="w-4 h-4 mr-2" />
                        反思：从回顾监测到预测预警，从单向收集到双向共创。
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-[#1100B9] mb-4 font-serif">
                      项目季跟组 HRBP
                    </h3>
                    <div className="bg-[#1100B9] text-white p-6 rounded-xl shadow-md">
                      <p className="font-serif italic mb-4 text-[#FFD500]">“人才是项目成功的基石”</p>
                      <ul className="space-y-2 text-sm text-white/90">
                        <li>• 100%熟悉项目志愿者，摸底志愿者需求画像</li>
                        <li>• 陪跑观察志愿者表现，识别未来培养对象，帮助他们更好地成长</li>
                        <li>• 产出：双周体验问卷发放&数据分析，团队成员性格能力观察记录，旁听PA周会补充信息</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div
                  key="tab2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-[#1100B9] mb-4 font-serif">
                      社群矩阵运营
                    </h3>
                    <p className="text-gray-600 mb-6">
                      日常社群体验为主轴，辅以重要节点运营活动，盘活志愿者池子。
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="border border-gray-100 p-6 rounded-xl bg-[#F8F9FA]">
                        <h4 className="font-bold mb-3 text-[#1100B9]">
                          职业发展社群
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• 深圳学生实习/求职群 (500人)</li>
                          <li>• 深圳战略/咨询/四大群 (150人)</li>
                        </ul>
                      </div>
                      <div className="border border-gray-100 p-6 rounded-xl bg-[#F8F9FA]">
                        <h4 className="font-bold mb-3 text-[#1100B9]">
                          兴趣类型社群
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• 影音书搭子群 (200人)</li>
                          <li>• 健身户外爬山群 (160人)</li>
                          <li>• 公益&志愿者活动群 (100人)</li>
                        </ul>
                      </div>
                      <div className="border border-gray-100 p-6 rounded-xl bg-[#F8F9FA]">
                        <h4 className="font-bold mb-3 text-[#1100B9]">
                          往届校友社群
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li>• 往届志愿者大群 (500+150人)</li>
                          <li>• 往届PM/PC储备池 (100+100人)</li>
                          <li>• 管理团队老干部 (130人)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white border border-red-100 p-6 rounded-xl mb-8">
                      <h4 className="font-bold text-red-500 mb-3">常见问题与挑战</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• 社群无筛选，导致潜水人数过多不活跃，对新加入志愿者有负面影响（需缩编精招，宁缺毋滥）</li>
                        <li>• 未充分利用现有资源开展社群活动（需盘点往届志愿者、客户能力擅长标签库）</li>
                        <li>• 社群运营缺乏激励机制（考虑将现有积分体系向社群过渡）</li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-bold text-[#1100B9] mb-4 font-serif">
                      体验微创新
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center p-4 bg-[#F8F9FA] rounded-lg border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-[#FFD500]/20 flex items-center justify-center text-[#1100B9] font-bold mr-4">1</div>
                        <div>
                          <h4 className="font-bold text-gray-900">社会创新主题桌游趴</h4>
                          <p className="text-sm text-gray-500">通过桌游方式了解企业在商业活动中如何做好CSR，新颖又好玩。</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-[#F8F9FA] rounded-lg border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-[#FFD500]/20 flex items-center justify-center text-[#1100B9] font-bold mr-4">2</div>
                        <div>
                          <h4 className="font-bold text-gray-900">年终圣诞趴 / 新年趴</h4>
                          <p className="text-sm text-gray-500">隆重举办，邀请在任/往届管理团队、项目团队、明星客户参与共创。</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-[#F8F9FA] rounded-lg border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-[#FFD500]/20 flex items-center justify-center text-[#1100B9] font-bold mr-4">3</div>
                        <div>
                          <h4 className="font-bold text-gray-900">固定 PM Pool + 定制化节日问候</h4>
                          <p className="text-sm text-gray-500">往届PM+优秀PC池子定期Review，保持粘性与关怀。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#0A0A0A] text-white py-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-6 md:mb-0">
        <div className="text-2xl font-bold tracking-tighter mb-2 font-serif">
          <span className="text-[#FFD500]">ABC</span> 美好社会咨询社
        </div>
        <p className="text-white/40 text-sm">
          A Better Community, A Better Us.
        </p>
      </div>
      <div className="text-white/40 text-sm font-mono">
        志愿者体验管理指南 © 2023
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans selection:bg-[#FFD500] selection:text-[#1100B9]">
      <Navbar />
      <Hero />
      <FormulaSection />
      <ConceptsSection />
      <TimelineSection />
      <JourneyMapSection />
      <PracticesSection />
      <Footer />
    </div>
  );
}
