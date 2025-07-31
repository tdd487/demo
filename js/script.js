// Banner轮播图功能
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.banner-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.banner-prev');
  const nextBtn = document.querySelector('.banner-next');
  
  let currentSlide = 0;
  let slideInterval;
  
  // 切换到指定幻灯片
  function goToSlide(index) {
    // 移除当前活动状态
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // 设置新的活动状态
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }
  
  // 下一张幻灯片
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }
  
  // 上一张幻灯片
  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }
  
  // 开始自动播放
  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 3000); // 3秒切换一次
  }
  
  // 停止自动播放
  function stopAutoPlay() {
    clearInterval(slideInterval);
  }
  
  // 事件监听器
  prevBtn.addEventListener('click', function() {
    prevSlide();
    stopAutoPlay();
    startAutoPlay();
  });
  
  nextBtn.addEventListener('click', function() {
    nextSlide();
    stopAutoPlay();
    startAutoPlay();
  });
  
  // 指示器点击事件
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      goToSlide(index);
      stopAutoPlay();
      startAutoPlay();
    });
  });
  
  // 鼠标悬停时停止自动播放
  const bannerContainer = document.querySelector('.banner-container');
  bannerContainer.addEventListener('mouseenter', stopAutoPlay);
  bannerContainer.addEventListener('mouseleave', startAutoPlay);
  
  // 开始自动播放
  startAutoPlay();
}); 

// 相关单位tab切换功能
document.querySelectorAll('.xgdw-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    // 移除所有tab的active状态
    document.querySelectorAll('.xgdw-tab').forEach(t => t.classList.remove('active'));
    // 添加当前tab的active状态
    this.classList.add('active');
    
    // 获取当前tab的索引
    const tabIndex = this.getAttribute('data-tab');
    
    // 隐藏所有卡片列表
    document.querySelectorAll('.xgdw-card-list').forEach(list => {
      list.classList.remove('active');
    });
    
    // 显示对应的卡片列表
    const targetList = document.querySelector(`.xgdw-card-list[data-tab="${tabIndex}"]`);
    if (targetList) {
      targetList.classList.add('active');
    }
  });
});

// 资讯新闻轮播功能
$(function () {
  var $slides = $('.news-carousel-slide');
  var $indicators = $('.news-carousel-indicator');
  var total = $slides.length;
  var current = 0;
  var timer = null;
  var animating = false;

  // 初始化
  $slides.css({position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1, display: 'none', opacity: 1});
  $slides.eq(0).css({display: 'block', zIndex: 2, opacity: 1}).addClass('active');
  $indicators.removeClass('active').eq(0).addClass('active');

  function goTo(idx) {
    if (idx === current || animating) return;
    animating = true;
    var $cur = $slides.eq(current);
    var $next = $slides.eq(idx);
    $next.css({display: 'block', zIndex: 3, opacity: 0});
    $cur.css({zIndex: 2});
    $next.stop(true, true).animate({opacity: 1}, 350, function () {
      $cur.css({display: 'none', zIndex: 1, opacity: 1}).removeClass('active');
      $next.css({zIndex: 2}).addClass('active');
      $indicators.removeClass('active').eq(idx).addClass('active');
      current = idx;
      animating = false;
    });
  }

  function next() {
    var idx = (current + 1) % total;
    goTo(idx);
  }

  function prev() {
    var idx = (current - 1 + total) % total;
    goTo(idx);
  }

  function start() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, 3000);
  }

  function stop() {
    if (timer) clearInterval(timer);
  }

  // 指示器点击切换
  $indicators.on('click', function () {
    var idx = $(this).data('slide');
    if (typeof idx === 'undefined') idx = $(this).index();
    if (idx === current) return;
    goTo(idx);
    stop();
    start();
  });

  // 鼠标悬停暂停
  $('.news-carousel').on('mouseenter', stop).on('mouseleave', start);

  // 鼠标拖拽切换
  var dragStartX = 0, dragging = false;
  $('.news-carousel-slider').on('mousedown', function(e) {
    if (e.button !== 0) return;
    dragging = true;
    dragStartX = e.pageX;
    e.preventDefault();
  });
  $(document).on('mousemove', function(e) {
    if (!dragging) return;
    e.preventDefault();
  }).on('mouseup', function(e) {
    if (!dragging) return;
    dragging = false;
    var delta = e.pageX - dragStartX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        prev();
      } else {
        next();
      }
      stop(); start();
    }
  });

  // 防止图片拖拽被浏览器默认行为影响
  $('.news-carousel-slide img').on('dragstart', function(e){ e.preventDefault(); });

  // 启动自动播放
  start();
}); 

document.querySelectorAll('.news-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.news-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    const tabIndex = this.getAttribute('data-tab');
    document.querySelectorAll('.news-tab-content').forEach(list => {
      list.classList.remove('active');
      if (list.getAttribute('data-tab') === tabIndex) {
        list.classList.add('active');
      }
    });
  });
}); 



// 地市选择弹窗交互
$(function() {
  // 显示弹窗
  $('.location-bar').on('click', function() {
    $('.city-modal-mask, .city-modal').show();
  });
  // 关闭弹窗
  $('.city-modal-cancel, .city-modal-mask').on('click', function() {
    $('.city-modal-mask, .city-modal').hide();
  });
  // 选择地市
  $('.city-modal-level').on('click', function() {
    $('.city-modal-level').removeClass('city-modal-level-active');
    $(this).addClass('city-modal-level-active');
    var city = $(this).text();
    if(city === '本级') city = '南宁市';
    $('.city-modal-city').text(city);
    $('.city-modal-selected-text').text('广西壮族自治区 / ' + city);
  });
  // 城市按钮选中逻辑
  $(document).on('click', '.city-modal-city-btn', function() {
    $('.city-modal-city-btn').removeClass('active');
    $(this).addClass('active');
    var city = $(this).text();
    $('.city-modal-selected-text').text('广西壮族自治区 / ' + city);
  });
  // 确认选择时同步到顶部
  $('.city-modal-confirm').on('click', function() {
    var city = $('.city-modal-city-btn.active').text();
    if(city === '全广西') city = '广西壮族自治区';
    $('.location-text').text(city);
    $('.city-modal-mask, .city-modal').hide();
  });
});

// 广西地市与县区数据
const cityDistrictData = {
  '南宁市': ['兴宁区', '青秀区', '江南区', '西乡塘区', '良庆区', '邕宁区', '武鸣区', '隆安县', '马山县', '上林县', '宾阳县', '横州市'],
  '柳州市': ['城中区', '鱼峰区', '柳南区', '柳北区', '柳江区', '柳城县', '鹿寨县', '融安县', '融水苗族自治县', '三江侗族自治县'],
  '桂林市': ['秀峰区', '叠彩区', '象山区', '七星区', '雁山区', '临桂区', '阳朔县', '灵川县', '全州县', '兴安县', '永福县', '灌阳县', '龙胜各族自治县', '资源县', '平乐县', '荔浦市', '恭城瑶族自治县'],
  '梧州市': ['万秀区', '长洲区', '龙圩区', '苍梧县', '藤县', '蒙山县', '岑溪市'],
  '北海市': ['海城区', '银海区', '铁山港区', '合浦县'],
  '防城港市': ['港口区', '防城区', '上思县', '东兴市'],
  '钦州市': ['钦南区', '钦北区', '灵山县', '浦北县'],
  '贵港市': ['港北区', '港南区', '覃塘区', '平南县', '桂平市'],
  '玉林市': ['玉州区', '福绵区', '容县', '陆川县', '博白县', '兴业县', '北流市'],
  '百色市': ['右江区', '田阳区', '田东县', '平果市', '德保县', '靖西市', '那坡县', '凌云县', '乐业县', '田林县', '西林县', '隆林各族自治县'],
  '贺州市': ['八步区', '平桂区', '昭平县', '钟山县', '富川瑶族自治县'],
  '河池市': ['金城江区', '宜州区', '南丹县', '天峨县', '凤山县', '东兰县', '罗城仫佬族自治县', '环江毛南族自治县', '巴马瑶族自治县', '都安瑶族自治县', '大化瑶族自治县'],
  '来宾市': ['兴宾区', '忻城县', '象州县', '武宣县', '金秀瑶族自治县', '合山市'],
  '崇左市': ['江州区', '扶绥县', '宁明县', '龙州县', '大新县', '天等县', '凭祥市']
};

function fillCitySelect() {
  const citySelect = document.getElementById('city-select');
  citySelect.innerHTML = '<option value="">选择</option>';
  Object.keys(cityDistrictData).forEach(city => {
    const opt = document.createElement('option');
    opt.value = city;
    opt.textContent = city;
    citySelect.appendChild(opt);
  });
}

function fillDistrictSelect(city) {
  const districtSelect = document.getElementById('district-select');
  districtSelect.innerHTML = '<option value="">选择</option>';
  if (cityDistrictData[city]) {
    cityDistrictData[city].forEach(district => {
      const opt = document.createElement('option');
      opt.value = district;
      opt.textContent = district;
      districtSelect.appendChild(opt);
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  fillCitySelect();
  var citySelect = document.getElementById('city-select');
  var goBtn = document.querySelector('.site-select-btn');
  citySelect.addEventListener('change', function() {
    fillDistrictSelect(this.value);
    document.getElementById('district-select').selectedIndex = 0;
    if (this.value) {
      goBtn.disabled = false;
    } else {
      goBtn.disabled = true;
    }
  });
  // 初始化时按钮禁用
  goBtn.disabled = true;
});

// 资讯动态中心动态轮播交互（jQuery版）
$(function() {
  var $carousel = $('.news-center-carousel');
  var $items = $('.news-center-carousel-item');
  var $indicators = $('.news-center-carousel-indicator');
  var current = 0;
  var timer = null;
  var interval = 5000;

  function show(index) {
    $items.removeClass('active').eq(index).addClass('active');
    $indicators.removeClass('active').eq(index).addClass('active');
    current = index;
  }

  function next() {
    var nextIndex = (current + 1) % $items.length;
    show(nextIndex);
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(next, interval);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  $indicators.on('mouseenter click', function() {
    var idx = $(this).index();
    show(idx);
    stopAuto();
    startAuto();
  });

  $carousel.on('mouseenter', stopAuto).on('mouseleave', startAuto);

  // 初始化
  show(0);
  startAuto();
});

// 资讯动态页面tab切换功能
$(function() {
  $('.news-tabs-bar-tab').on('click', function() {
    // 移除所有tab的active状态
    $('.news-tabs-bar-tab').removeClass('active');
    // 添加当前tab的active状态
    $(this).addClass('active');
    
    // 隐藏所有内容区域
    $('.news-center-carousel-section, .news-industry-section, .news-notice-section, .news-policy-section').hide();
    
    // 根据tab索引显示对应内容
    var tabIndex = $(this).index();
    switch(tabIndex) {
      case 0: // 中心动态
        $('.news-center-carousel-section').show();
        break;
      case 1: // 行业资讯
        $('.news-industry-section').show();
        break;
      case 2: // 通知公告
        $('.news-notice-section').show();
        break;
      case 3: // 政策法规
        $('.news-policy-section').show();
        break;
    }
  });
});