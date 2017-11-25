L = iload = iLoad = (function() {

  // options

  L.zIndex = 9999;
  L.infoAttribute = 'title';
  L.markAttribute = 'rel';
  L.path = '../';
  L.errorWidth = 240;
  L.errorName = 'Ошибка!';
  L.errorText = 'Не удалось загрузить изображение. Возможно адрес задан не верно или сервер временно не доступен.';
  L.errorNameCss = 'display:block;font-weight:700;color:#999;padding-bottom:4px;';
  L.errorDescCss = 'display:block;padding-bottom:4px;';
  L.fontCss = 'font:11px Tahoma,Arial,Helvetica,sans-serif;color:#aaa;text-align:left;';
  L.imageDescCss = 'display:block;';
  L.imageNameCss = 'display:block;font-weight:700;color:#999;';
  L.imageSetCss = 'display:block;';
  L.imageInfoCss = 'display:block;';
  L.splitSign = '|';
  L.bigButtonsDisabledOpacity = 30;
  L.bigButtonsPassiveOpacity = 100;
  L.bigButtonsActiveOpacity = 70;
  L.minButtonsPassiveOpacity = 50;
  L.minButtonsActiveOpacity = 100;
  L.overlayAppearTime = 200;
  L.overlayDisappearTime = 200;
  L.containerAppearTime = 300;
  L.containerDisappearTime = 300;
  L.containerResizeTime = 300;
  L.contentAppearTime = 350;
  L.contentDisappearTime = 200;
  L.loaderAppearTime = 200;
  L.loaderDisappearTime = 200;
  L.containerCenterTime = 300;
  L.panelAppearTime = 300;
  L.panelDisappearTime = 300;
  L.arrowsTime = 230;
  L.paddingFromScreenEdge = 18;
  L.contentPadding = 0;
  L.cornersSize = 18;
  L.overlayOpacity = 85;
  L.overlayBackground = '#000000';
  L.containerColor = '#ffffff';
  L.panelType = 2;
  L.hidePanelWhenScale = true;
  L.closeOnClickWhenSingle = true;
  L.forceCloseButton = false;
  L.arrows = true;
  L.imageNav = true;
  L.showSize = true;
  L.forceFullSize = false;
  L.keyboard = true;
  L.dragAndDrop = true;
  L.preloadNeighbours = true;
  L.showInfo = true;
  L.showSet = true;
  L.showName = true;
  L.showDesc = true;
  L.imageSetText = ['<b>[N]</b> из <b>[T]</b>',' в группе "[S]"'];
  L.fileInfoText = 'Файл формата <b>[F]</b> размером <b>[W]х[H]</b> пикселей';
  L.tips = ['Предыдущее','Следующее','Закрыть','Слайдшоу','Пауза','Оригинал','Уместить в окне'];
  L.slideshowTime = 3000;
  L.slideshowRound = true;
  L.slideshowClose = false;

  function L(l, n, y, o, i, c, f, k, h, g, j, z, q) {
    if (L.ready) {
      y = y === 0 ? 0 : (y || 1);
      if (!L.animating && y > 0 && y <= l.length) {
        L.data = l;
        L.total = l.length;
        q = L.num;
        L.num = y;
        L.imageThis = new Image();
        if (L.preloadNeighbours) {
          if (L.setName === n) {
            if (q === y - 1) {
              L.imageThis = L.imageNext
            } else {
              if (q === y + 1) {
                L.imageThis = L.imagePrev
              }
            }
          }
          if (l[y - 2]) {
            L.imagePrev = new Image(), L.imagePrev.src = l[y - 2].split(L.splitSign)[0]
          }
          if (l[y]) {
            L.imageNext = new Image(), L.imageNext.src = l[y].split(L.splitSign)[0]
          }
        }
        L.setName = n;
        j = l[y - 1].split(L.splitSign);
        L.imageThis.src = j[0];
        L.imageName = L.showName ? j[1] : "";
        L.imageDesc = L.showDesc ? j[2] : "";
        L.size = L.forceFullSize && L.size != "computed" ? "original" : L.size;
        L.event.execute("onbeforechange");
        if (L.closeOnClickWhenSingle && L.total == 1) {
          L.imageThis.style.cursor = "pointer"
        }
        if (L.dragAndDrop) {
          i = 0;
          L.imageThis.onmousedown = function(_) {
            c = _cursorx;
            f = _cursory;
            g = L.imageThis.style.cursor || "default";
            k = _box.offsetLeft;
            h = _box.offsetTop;
            i = 1;
            _prevent(_)
          };
          _event(document, "mouseup", _wrap.onmouseup = function() {
            i = 0;
            L.imageThis.style.cursor = g
          })
        }
        _event(document, "mousemove", function(_) {
          if (i) {
            L.imageThis.style.cursor = "move";
            _box.style.left = k + _cursorx - c + "px";
            _box.style.top = h + _cursory - f + "px";
            _prevent(_)
          } else {
            L.cursorTest()
          }
        });
        L.imageThis.onclick = function(event) {
          _eval(_wrap.onmouseup);
          if ((c == _cursorx && f == _cursory) || !L.dragAndDrop) {
            if (L.imageNav && L.cursorPosition < 2 && L.total != 1) {
              L.cursorPosition ? L.next() : L.previous()
            } else {
              if (L.closeOnClickWhenSingle && L.total == 1) {
                L.hide()
              }
            }
          }
        };
        L.show(function() {
          var complete = false,
            error = false,
            gate = true,
            init = function() {
              if (gate) {
                gate = false;
                L.hideLoader(function() {
                  m(error)
                })
              }
            },
            content = !!L.content.innerHTML;
          L.imageThis.onload = function() {
            if (!content) {
              init()
            } else {
              complete = true
            }
          };
          L.imageThis.onerror = L.imageThis.onabort = function() {
            complete = error = 1;
            if (!content) {
              init()
            }
          };
          L.imageThis.src = L.imageThis.src;
          if (_badsrc[L.imageThis.src] || !j[0]) {
            error = complete = 1
          }
          if (content) {
            if (L.bigPanelOpened) {
              L.closePanel(function() {
                L.hideContent(function() {
                  L.content.innerHTML = "";
                  if (complete || L.imageThis.width) {
                    init()
                  } else {
                    L.showLoader();
                    content = false
                  }
                })
              })
            } else {
              L.hideContent(function() {
                L.content.innerHTML = "";
                if (complete || L.imageThis.width) {
                  init()
                } else {
                  L.showLoader();
                  content = false
                }
              })
            }
          } else {
            if (complete || L.imageThis.width) {
              init()
            } else {
              L.showLoader()
            }
          }
        });

        function m(error) {
          if (error) {
            if (error == 1) {
              _badsrc[L.imageThis.src] = 1
            }
            L.imageName = L.errorName;
            L.imageDesc = L.errorText;
            L.imageThis.width = L.errorWidth;
            L.imageThis.height = 0
          } else {
            _a(_preload, L.imageThis)
          }
          var cc = (L.cornersSize - L.contentPadding) * 2,
            CC = L.cornersSize + L.contentPadding,
            e = L.cInfo(2) - cc - (L.panelType == 2 ? parseInt(36 + L.cornersSize) : 0) - L.paddingFromScreenEdge * 2,
            d = L.cInfo(1) - (L.arrows ? 70 : 0) - cc - L.paddingFromScreenEdge * 2,
            t = L.imageThis.width,
            a = L.imageThis.height,
            b = 1,
            r, w, u = 0,
            p = 0,
            s = 152 - cc,
            v = ((L.total > 1 || n) && L.showSet) || L.imageName || L.imageDesc || (L.forceCloseButton && L.panelType == 1) || L.showInfo,
            ext = j[0].match(/\.(\w+)(?:$|#|\?)|^\s?data:image\/(\w+)/i);
          _minPanel.innerHTML = (L.imageName ? '<span style="' + (error ? L.errorNameCss : L.imageNameCss) + '">' + L.imageName + "</span>" : "").concat(
            (L.imageDesc ? '<span style="' + (error ? L.errorDescCss : L.imageDescCss) + '">' + L.imageDesc + "</span>" : ""),
            ((L.total > 1 || n) && L.showSet ? '<span style="' + L.imageSetCss + '">'.concat(
              L.imageSetText[0].replace("[N]", y).replace("[T]", L.total),
              (n ? L.imageSetText[1].replace("[S]", n) : ""),
              "</span>"
            ) : ""),
            (L.showInfo && !error ? '<span style="' + L.imageInfoCss + '">'.concat(
              L.fileInfoText.replace("[F]", (ext[1] || ext[2] || '?').toLowerCase()).replace("[W]", t).replace("[H]", a),
              "</span>"
            ) : ""),
            ((L.total > 1 || L.forceCloseButton || t > d || a > e) && L.panelType == 1 ? "<div class=L_0>".concat(
              (L.total > 1 && (L.slideshowRound || (y != L.total || L.slideshowClose && L.slideshow)) ? '<a href="javascript:void(0)" onclick="this.parentNode.parentNode.__L__.' + (!L.slideshow ? 'play()" title="' + L.tips[3] + '" class=L_g' : 'stop()" title="' + L.tips[4] + '" class=L_h') + "><b><i></i></b></a>" : ""),
              '<a title="' + L.tips[2] + '" class=L_f href="javascript:void(0)" onclick="this.parentNode.parentNode.__L__.hide()"><b><i></i></b></a>',
              (L.total > 1 && y > 1 ? '<a title="' + L.tips[0] + '" class=L_e href="javascript:void(0)" onclick="this.parentNode.parentNode.__L__.previous()"><b><i></i></b></a>' : ""),
              (L.total > 1 && y < L.total ? '<a title="' + L.tips[1] + '" class=L_d href="javascript:void(0)" onclick="this.parentNode.parentNode.__L__.next()"><b><i></i></b></a>' : ""),
              "</div>"
            ) : "")
          );
          _minPanel.style.width = Math.max(L.imageThis.width, s) + "px";
          _a(_preload, _minPanel);
          r = function() {
            t = u || t;
            a = p || a;
            u = t > d ? d : t;
            _minPanel.style.width = u + "px";
            a = p = a / 100 * (100 / t * u);
            w = parseInt(_minPanel.offsetHeight + CC);
            p = Math.round(p > e - w ? e - w : p);
            u = Math.round(u / 100 * (100 / a * p));
            _minPanel.style.width = u + "px";
            if (p < s) {
              u = u / 100 * (100 / p * s);
              p = s;
              b = 11
            } else {
              if (u < s) {
                p = p / 100 * (100 / u * s);
                u = s;
                b = 11
              }
            }
            if ((p + _minPanel.offsetHeight + CC > e || u > d) && b < 10) {
              b++;
              r()
            } else {
              L.imageThis.style.width = u + "px";
              L.imageThis.style.height = p + "px"
            }
          };
          z = function() {
            return t > d - cc || a > e - (v ? _minPanel.offsetHeight + CC : 0)
          };
          L.imageThis.height > s && L.imageThis.width > s && L.size != "original" && z() && r();
          _overflow = z();
          t = u || t;
          a = p || a;
          if (!error) {
            with(L.imageThis.style) {
              if (a < s) {
                borderTop = (s - a) / 2 + "px solid " + L.containerColor;
                borderBottom = (s - a) / 2 + "px solid " + L.containerColor;
                a = s
              }
              if (t < s) {
                borderLeft = (s - t) / 2 + "px solid " + L.containerColor;
                borderRight = (s - t) / 2 + "px solid " + L.containerColor;
                t = s
              }
            }
          } else {
            a = 0
          }
          if (L.panelType == 2) {
            _bigPanel.innerHTML = "<i></i>".concat('<a title="', L.tips[3], '" class="L_g', L.total < 2 || (!L.slideshowRound && y == L.total) || L.slideshow ? " L_a" : "", '" href="javascript:void(0)" onclick="this.parentNode.__L__.play()"><b></b></a><a title="', L.tips[4], '" class="L_h', L.total > 1 && (L.slideshowRound || (y != L.total || L.slideshowClose)) && L.slideshow ? "" : " L_a", '" href="javascript:void(0)" onclick="this.parentNode.__L__.stop()"><b></b></a><a title="', L.tips[2], '" class=L_f href="javascript:void(0)" onclick="this.parentNode.__L__.hide()"><b></b></a><a title="', L.tips[0], '" class="L_e', y < 2 ? " L_a" : "", '" href="javascript:void(0)" onclick="this.parentNode.__L__.previous()"><b></b></a><a title="', L.tips[1], '" class="L_d', y == L.total ? " L_a" : "", '" href="javascript:void(0)" onclick="this.parentNode.__L__.next()"><b></b></a>', "<div class=L_4><p></p>", '<a href="javascript:void(0)" title="', L.size == "original" ? L.tips[6] + '" class=L_b onclick="this.parentNode.parentNode.__L__.computed' : L.tips[5] + '" class=L_c onclick="this.parentNode.parentNode.__L__.original', '()"><b></b></a></div>')
          } else {
            if (_overflow && L.showSize) {
              with(_minPanel.lastChild) {
                innerHTML = innerHTML.concat('<a href="javascript:void(0)" title="', L.size == "original" ? L.tips[6] + '" class=L_b onclick="this.parentNode.parentNode.__L__.computed' : L.tips[5] + '" class=L_c onclick="this.parentNode.parentNode.__L__.original', '()"><b><i></i></b></a>')
              }
            }
          }
          L.scale(t + CC * 2, parseInt(a + CC * 2 + (v || _overflow && L.panelType == 1 ? _minPanel.offsetHeight + CC : 0)) - (error ? L.cornersSize : 0), function() {
            if (!error) {
              _a(L.content, L.imageThis)
            }
            if (v || (_overflow && L.showSize)) {
              _a(L.content, _minPanel)
            }
            L.showContent(function() {
              L.openPanel(_overflow && L.showSize);
              L.cursorTest(2);
              L.size = "default";
              _showTiming();
              _eval(o);
              if (error) {
                L.event.execute("onerror")
              }
              L.event.execute("onafterchange")
            })
          })
        }
      }
    }
  }

  var _showTiming = function() {
      clearTimeout(_showTimer);
      if (L.slideshow) {
        _showTimer = setTimeout(function() {
          if (L.slideshow) {
            L.slideshow = 0, L.play()
          }
        }, L.slideshowTime)
      }
    },
    _ie = !-[1, ],
    _opera = /^function \(/.test([].sort),
    _onresize = function() {
      _counter && clearTimeout(_counter);
      _counter = setTimeout(L.center, 100)
    },
    _prevent = function(a) {
      _ie ? window.event.returnValue = false : a.preventDefault()
    },
    _c = function() {
      return document.createElement("div")
    },
    _a = function(d, c) {
      d.appendChild(c)
    },
    _remove = function() {
      L.content.style.display = _wait.style.display = _contentOverlay.style.display = _preload.style.display = "none"
    },
    _paste = function() {
      _contentOverlay.style.display = L.content.style.display = _wait.style.display = _preload.style.display = ""
    },
    _eval = function(a) {
      if ("function" == typeof a) {
        a()
      }
    },
    _event = function(e, d, f) {
      if (_ie) {
        e.attachEvent("on" + d, f)
      } else {
        e.addEventListener(d, f, false)
      }
    },
    _remevent = function(e, d, f) {
      if (_ie) {
        e.detachEvent("on" + d, f)
      } else {
        e.removeEventListener(d, f, false)
      }
    },
    _evcatch = function(a) {
      a = a || window.event;
      _cursorx = a.clientX + L.cInfo(3);
      _cursory = a.clientY + L.cInfo(4)
    },
    _animator = [],
    _badsrc = {},
    _queue = 0,
    _overflow = false,
    _counter, _cursorx, _cursory, _showTimer, _minPanel, _bigPanel, _overlay, _wrap, _box, _tc, _bc, _leftArrow, _rightArrow, _inner, _outer, _contentOverlay, _wait, _preload, _eventcash = {
      onerror: [],
      onafterchange: [],
      onbeforechange: [],
      onshow: [],
      onhide: [],
      onscale: [],
      onload: []
    },
    _siblings = function(g) {
      var b = [],
        d, a = 0,
        c = [],
        k = false,
        f = false,
        j = g.getAttribute(L.markAttribute, 0),
        e = document.links,
        l = [];
      l[0] = g;
      if (j.length > L.splitSign.length + 5) {
        for (; a < e.length; a++) {
          if (e[a].getAttribute(L.markAttribute, 0) == j) {
            b.push(e[a])
          }
        }
        a = 0;
        for (; a < b.length; a++) {
          if (g == b[a]) {
            f = a + 1, k = j.split(L.splitSign)[1], l = b
          }
        }
      }
      a = 0;
      for (; a < l.length; a++) {
        var h = l[a].getAttribute(L.infoAttribute, 0);
        if (h) {
          d = h.split(L.splitSign);
          v = d[0];
          q = d[1] ? d[1] : false
        } else {
          q = v = false
        }
        c[a] = l[a].href + L.splitSign + (v || "") + (q ? L.splitSign + q : "")
      }
      return {
        data: c,
        group: k,
        num: f
      }
    };
  L.opened = L.animating = L.bigPanelOpened = L.ready = false;
  L.size = "default";
  L.data = L.setName = L.imageName = L.imageDesc = L.cursorPosition = "";
  L.num = L.slideshow = L.imagePrev = L.imageThis = L.imageNext = L.total = 0;
  L.lock = false;
  L.travers = function(a) {
    if (!(_ie ? a.button == 0 : a.which == 1)) {
      return
    }
    var c, b = _ie ? window.event.srcElement : a.target;
    if (b == _wrap || b == _overlay) {
      L.hide();
      return
    }
    while (true) {
      if (b == document.body) {
        return
      }
      if (b.tagName == "A" && new RegExp("^i[lL]oad($|" + L.splitSign.replace(/(.)/g, "\\$1") + ".*)").test(b.getAttribute(L.markAttribute, 0))) {
        break
      } else {
        b = b.parentNode
      }
    }
    _prevent(a);
    c = _siblings(b);
    L(c.data, c.group, c.num)
  };
  L.set = function(e, b) {
    var a = document.links,
      d = 0,
      e, c = a.length;
    for (; d < c; d++) {
      if (new RegExp("^i[lL]oad" + (L.splitSign + e).replace(/(.)/g, "\\$1")).test(a[d].getAttribute(L.markAttribute, 0))) {
        e = _siblings(a[d]);
        L(e.data, e.group, !b || b > e.data.length ? 1 : b);
        return true
      }
    }
    return false
  };
  L.event = {
    add: function(a, b) {
      if (!_eventcash[a]) {
        return
      }
      _eventcash[a].push(b)
    },
    remove: function(a, b) {
      if (!_eventcash[a]) {
        return
      }
      _eventcash[a].splice((function(d, c) {
        while (c--) {
          if (d[c] === b) {
            return c
          }
        }
      })(_eventcash[a], _eventcash[a].length), 1)
    },
    execute: function(c) {
      if (!_eventcash[c]) {
        return
      }
      var b = _eventcash[c].length;
      while (b--) {
        _eval(_eventcash[c][b])
      }
    }
  };
  L.animateSimp = function(f, e, h, g) {
    L.animate(f, e, h, g, 1)
  };
  L.animate = function(h, j, f, l, b) {
    var e, c = 0,
      d = function(n, r, o, p) {
        if (n) {
          if (_ie) {
            p.style.filter = o == 100 ? "" : "alpha(opacity=" + o + ")"
          } else {
            p.style.opacity = o
          }
        } else {
          p.style[r] = o + "px"
        }
      };
    for (e in j) {
      var k = _queue,
        i = 0,
        a, g = e == "opacity",
        m = null;
      while (k--) {
        if (_animator[k] && _animator[k].o == h && _animator[k].p == e) {
          clearInterval(_animator[k].timer), _animator.splice(k, 1, null), m = k
        }
      }
      switch (e) {
        case "opacity":
          i = _ie ? (h.style.filter ? parseFloat(h.style.filter.match(/\d+/)) : 100) : parseFloat(document.defaultView.getComputedStyle(h, null)[e]);
          if (!_ie) {
            j[e] /= 100
          }
          break;
        case "marginTop":
        case "marginLeft":
        case "right":
        case "bottom":
          i = parseInt(h.style[e] || 0);
          break;
        case "width":
          i = h.offsetWidth;
          break;
        case "height":
          i = h.offsetHeight;
          break;
        case "top":
          i = h.offsetTop;
          break;
        case "left":
          i = h.offsetLeft
      }
      if (!m) {
        m = _queue++
      }
      if (f > 0 && i != j[e]) {
        c++;
        (function(o, s, t, r, u, p, n) {
          _animator[o] = {
            o: s,
            p: t,
            start: new Date().getTime(),
            timer: setInterval(function() {
              a = (new Date().getTime() - _animator[o].start) / f;
              if (p) {
                if (_ie) {
                  s.style.filter = "alpha(opacity=" + ((r - u) * a + u) + ")"
                } else {
                  s.style.opacity = (r - u) * a + u
                }
              } else {
                s.style[t] = (r - u) * (n ? a : (a < 0.5 ? Math.pow(2 * a, 3) + 0 * 1 : 2 - Math.pow(2 * (1 - a), 3)) / 2) + u + "px"
              }
              if (a >= 1) {
                clearInterval(_animator[o].timer);
                _animator.splice(o, 1, null);
                d(p, t, r, s);
                _eval(l);
                l = false
              }
            }, 8)
          }
        })(m, h, e, j[e], i, g, b)
      } else {
        d(g, e, j[e], h)
      }
    }
    if (!c) {
      _eval(l), l = false
    }
  };
  L.cInfo = function(_) {
    with(document) {
      switch (_) {
        case 1:
          return compatMode == "CSS1Compat" ? documentElement.clientWidth : body.clientWidth;
        case 2:
          return compatMode == "CSS1Compat" ? documentElement.clientHeight : body.clientHeight;
        case 3:
          return body.scrollLeft || documentElement.scrollLeft;
        case 4:
          return body.scrollTop || documentElement.scrollTop
      }
    }
  };
  L.toString = L.valueOf = function() {
    return "function iLoad() {\r\n    [native code]\r\n}"
  };
  L.current = function() {
    L(L.data, L.setName, L.num)
  };
  L.next = function() {
    L(L.data, L.setName, L.num + 1)
  };
  L.previous = function() {
    L(L.data, L.setName, L.num - 1)
  };
  L.first = function() {
    L(L.data, L.setName, 1)
  };
  L.last = function() {
    L(L.data, L.setName, L.total)
  };
  L.play = function() {
    if (!L.slideshow && !L.animating && L.total > 1) {
      L.slideshow = 1;
      if (L.total > 1 && L.num < L.total) {
        L.next()
      } else {
        if (L.slideshowRound) {
          L.first()
        } else {
          L.slideshowClose && L.hide();
          L.slideshow = 0;
          clearTimeout(_showTimer)
        }
      }
    }
  };
  L.stop = function() {
    if (L.slideshow) {
      L.slideshow = 0, _showTiming(), L.current()
    }
  };
  L.computed = function() {
    L.size = "computed";
    L.current()
  };
  L.original = function() {
    L.size = "original";
    L.current()
  };
  L.openPanel = function(a) {
    if (L.panelType == 2 && L.ready) {
      if (!L.bigPanelOpened) {
        _box.appendChild(_bigPanel);
        L.animate(_bigPanel, {
          bottom: -(36 + L.cornersSize + L.contentPadding)
        }, L.panelAppearTime, function() {
          a && L.openSize();
          L.bigPanelOpened = true
        })
      } else {
        a && L.openSize()
      }
    }
  };
  L.closePanel = function(d, a) {
    if (L.panelType == 2 && L.ready) {
      var b = function() {
        L.animate(_bigPanel, {
          bottom: 4
        }, L.panelDisappearTime, function() {
          L.bigPanelOpened = false;
          _a(_preload, _bigPanel);
          _eval(d)
        })
      };
      if (L.bigPanelOpened && (a || L.hidePanelWhenScale)) {
        if (_overflow && L.showSize) {
          L.closeSize(b)
        } else {
          b()
        }
      } else {
        if (_overflow && L.showSize) {
          L.closeSize(d)
        } else {
          _eval(d)
        }
      }
    }
  };
  L.openSize = function(a) {
    L.showSize && L.ready && L.animate(_bigPanel, {
      width: 200,
      marginLeft: -100
    }, L.panelAppearTime, a)
  };
  L.closeSize = function(a) {
    L.showSize && L.ready && L.animate(_bigPanel, {
      width: 152,
      marginLeft: -76
    }, L.panelDisappearTime, a)
  };
  L.show = function(b) {
    if (L.ready && !L.animating) {
      if (!L.opened) {
        _overlay.style.display = _wrap.style.display = "";
        L.center();
        L.animating = L.opened = true;
        L.animate(_overlay, {
          opacity: L.overlayOpacity
        }, L.overlayAppearTime, function() {
          L.animate(_wrap, {
            opacity: 100
          }, L.containerAppearTime, function() {
            _wrap.style.filter = "";
            L.animating = false;
            _eval(b);
            L.event.execute("onshow")
          })
        })
      } else {
        _eval(b)
      }
    }
  };
  L.hide = function(b) {
    if (L.lock) {
      return
    }
    if (L.opened) {
      L.stop();
      L.animating = true;
      L.hideContent(function() {
        L.content.innerHTML = "";
        _remove();
        L.animate(_wrap, {
          opacity: 0
        }, L.containerDisappearTime, function() {
          _wrap.style.display = "none";
          L.animate(_overlay, {
            opacity: 0
          }, L.overlayDisappearTime, function() {
            _overlay.style.display = "none";
            _paste();
            L.hideLoader();
            L.closePanel(0, 1);
            L.opened = L.animating = false;
            _eval(b);
            L.event.execute("onhide")
          })
        })
      })
    }
  };
  L.create = function() {
    if (L.ready) {
      return
    }
    L.ready = true;
    _event(window, "resize", _onresize);
    _event(document, "click", L.travers);
    _event(document, "keyup", L.keys);
    _event(document.body, "mousemove", _evcatch);
    L.content = _c();
    _preload = _c();
    _minPanel = _c();
    _bigPanel = _c();
    _minPanel.__L__ = this;
    _bigPanel.__L__ = this;
    _wrap = _c();
    _overlay = _c();
    _box = _c();
    _leftArrow = _c();
    _rightArrow = _c();
    _vertical = _c();
    _vertical2 = _c();
    _horizontal = _c();
    _outer = _c();
    _contentOverlay = _c();
    _wait = new Image();
    _bigPanel.className = "L_1";
    _overlay.className = "L_5";
    _preload.className = "L_9";
    _contentOverlay.className = "L_6";
    _leftArrow.className = "L_2";
    _rightArrow.className = "L_3";
    _wrap.className = "L_7";
    _box.className = "L_8";
    _minPanel.style.cssText = "position:absolute;left:" + parseInt(L.cornersSize + L.contentPadding) + "px;bottom:" + parseInt(L.cornersSize * 2 + L.contentPadding) + "px;" + L.fontCss;
    _overlay.style.cssText = _wrap.style.cssText = "display:none;opacity:0;filter:alpha(opacity=0)";
    _leftArrow.style.cssText = _rightArrow.style.cssText = "margin-bottom:" + -L.cornersSize + "px;";
    _vertical.style.cssText = "background:" + L.containerColor + ";left:" + L.cornersSize + "px;z-index:" + (L.zIndex + 2) + ";height:100%;width:60%;position:absolute;";
    _vertical2.style.cssText = "background:" + L.containerColor + ";right:" + L.cornersSize + "px;z-index:" + (L.zIndex + 2) + ";height:100%;width:60%;position:absolute;";
    _horizontal.style.cssText = "top:-" + L.cornersSize + "px;z-index:" + (L.zIndex + 2) + ";height:100%;overflow:hidden;position:relative;";
    _outer.style.cssText = "background:" + L.containerColor + ";top:" + L.cornersSize * 2 + "px;z-index:" + (L.zIndex + 2) + ";height:100%;overflow:hidden;position:relative;";
    L.content.style.cssText = "padding:" + L.contentPadding + "px;margin:0 " + L.cornersSize + "px;";
    _bigPanel.style.cssText = "margin-left:-76px";
    _contentOverlay.innerHTML = '<b style="background:' + L.containerColor + '"></b>';
    _overlay.innerHTML = "<br><style>.L_0 i {background:".concat(L.containerColor, "}.L_1 i,.L_1 b,.L_2 b,.L_0 b,.L_4 p,.L_3 b{background-image:url(", L.path, "skin.png);_background-image:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=", L.path, "skin.png,sizingMethod=crop)}.L_0 b{background-image:none\9;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=", L.path, "skin.png)}.L_1 i,.L_1 b,.L_2 b,.L_0 b,.L_4 p,.L_3 b{display:block;width:240px;height:66px}.L_5,.L_6,.L_7{left:0;top:0;width:100%;height:100%}.L_5{background:", L.overlayBackground, ";z-index:", L.zIndex, ";position:fixed;_position:absolute;_height:expression(eval(L.cInfo(2)+L.cInfo(4))+'px');_width:expression(eval(L.cInfo(1)+L.cInfo(3))+'px')}.L_6{z-index:", L.zIndex + 4, ";position:absolute}.L_6 b{display:block;position:relative;height:100%}.L_7{z-index:", L.zIndex + 1, ";position:absolute;_height:expression(eval(L.cInfo(2))+'px');_width:expression(eval(L.cInfo(1))+'px')}.L_8{z-index:", L.zIndex + 2, ";width:152px;height:152px;position:relative}.L_2,.L_3{overflow:hidden;position:absolute;z-index:", L.zIndex + 1, ";width:35px;height:30px;top:50%;margin-top:-15px}.L_2 b{margin:-36px 0 0}.L_3 b{margin:-36px 0 0 -35px}#L_0,#L_1,#L_2,#L_3{overflow:hidden;position:absolute;z-index:", L.zIndex + 2, "}#L_0{left:0;top:0;}#L_1{left:0;bottom:0;}#L_2{right:0;top:0;}#L_3{right:0;bottom:0;}.L_9{top:-99999px;left:-99999px;position:absolute;visibility:hidden}.L_0{padding:2px 0 0}.L_0 a{font-size:0;display:-moz-inline-box;display:inline-block;overflow:hidden;margin-right:2px;height:13px;width:13px}.L_0 i{display:block;width:240px;height:66px;opacity:", 1 - L.minButtonsPassiveOpacity / 100, ";filter:alpha(opacity=", 100 - L.minButtonsPassiveOpacity, ")}.L_0 a:hover i{opacity:", 1 - L.minButtonsActiveOpacity / 100, ";filter:alpha(opacity=", 100 - L.minButtonsActiveOpacity, ")}.L_0 b{cursor:pointer}.L_1{position:absolute;z-index:", L.zIndex, ";width:152px;height:36px;bottom:4px;left:50%}.L_1 i{width:152px;height:36px;overflow:hidden;position:relative;z-index:", L.zIndex, "}.L_1 a{filter:alpha(opacity=", L.bigButtonsPassiveOpacity, ");opacity:", L.bigButtonsPassiveOpacity / 100, ";top:6px;position:absolute;font-size:0;display:block;overflow:hidden;height:24px;width:24px;z-index:", L.zIndex + 2, "}.L_1 a:hover{filter:alpha(opacity=", L.bigButtonsActiveOpacity, ");opacity:", L.bigButtonsActiveOpacity / 100, "}.L_a{filter:alpha(opacity=", L.bigButtonsDisabledOpacity, ")!important;opacity:", L.bigButtonsDisabledOpacity / 100, "!important;cursor:default!important}.L_a b{cursor:default!important}.L_1 b{cursor:pointer;position:relative}.L_4{z-index:auto;overflow:hidden;position:absolute;width:36px;height:36px;top:0;right:0;margin-left:-76px}.L_4 p{margin:0 0 0 -204px}.L_4 a{z-index:", L.zIndex - 1, ";_z-index:auto;position:absolute;top:6px;left:6px}.L_4 .L_b b{margin:-42px 0 0 -216px}.L_4 .L_c b{margin:-42px 0 0 -192px}.L_1 .L_d b{margin:-42px 0 0 -168px}.L_1 .L_e b{margin:-42px 0 0 -144px}.L_1 .L_f b{margin:-42px 0 0 -120px}.L_1 .L_g b{margin:-42px 0 0 -72px}.L_1 .L_h b{margin:-42px 0 0 -96px}.L_1 .L_d{left:122px}.L_1 .L_e{left:93px}.L_1 .L_f{left:64px}.L_1 .L_g{left:6px}.L_1 .L_h{left:35px}.L_0 .L_c b{margin:-28px 0 0 -181px}.L_0 .L_b b{margin:-14px 0 0 -181px}.L_0 .L_d b{margin:0 0 0 -167px}.L_0 .L_e b{margin:0 0 0 -153px}.L_0 .L_f b{margin:-14px 0 0 -167px}.L_0 .L_g b{margin:-14px 0 0 -153px}.L_0 .L_h b{margin:0 0 0 -181px}</style>");
    _a(_wrap, _box);
    _a(document.body, _wrap);
    if (L.cornersSize > 0) {
      if (_ie) {
        document.createStyleSheet().addRule("v\\:roundrect", "behavior: url(#default#VML);display:inline-block;position:absolute;");
        _box.innerHTML = '<div id=L_0 style="width:' + L.cornersSize + "px;height:" + L.cornersSize + 'px"><v:roundrect fillcolor="#' + L.containerColor + '" strokeWeight="1px" strokeColor="#' + L.containerColor + '" arcSize="' + L.cornersSize + '" style="width:' + (L.cornersSize * 2 - 1) + "px;height:" + (L.cornersSize * 2 - 1) + 'px;left:0px;top:0px;"></v:roundrect></div><div id="L_2" style="width:' + L.cornersSize + "px;height:" + L.cornersSize + 'px"><v:roundrect fillcolor="#' + L.containerColor + '" strokeWeight="1px" strokeColor="#' + L.containerColor + '" arcSize="' + L.cornersSize + '" style="width:' + (L.cornersSize * 2 - 1) + "px;height:" + (L.cornersSize * 2 - 1) + "px;left:-" + L.cornersSize + 'px;top:0px;"></v:roundrect></div><div id="L_1" style="width:' + L.cornersSize + "px;height:" + L.cornersSize + 'px"><v:roundrect fillcolor="#' + L.containerColor + '" strokeWeight="1px" strokeColor="#' + L.containerColor + '" arcSize="' + L.cornersSize + '" style="width:' + (L.cornersSize * 2 - 1) + "px;height:" + (L.cornersSize * 2 - 1) + "px;left:0px;top:-" + L.cornersSize + 'px;"></v:roundrect></div><div id="L_3" style="width:' + L.cornersSize + "px;height:" + L.cornersSize + 'px"><v:roundrect fillcolor="#' + L.containerColor + '" strokeWeight="1px" strokeColor="#' + L.containerColor + '" arcSize="' + L.cornersSize + '" style="width:' + (L.cornersSize * 2 - 1) + "px;height:" + (L.cornersSize * 2 - 1) + "px;left:-" + L.cornersSize + "px;top:-" + L.cornersSize + 'px;"></v:roundrect></div>'
      } else {
        _box.innerHTML = '<canvas id=L_0 width="' + L.cornersSize + '" height="' + L.cornersSize + '"></canvas><canvas id=L_2 width="' + L.cornersSize + '" height="' + L.cornersSize + '"></canvas><canvas id=L_1 width="' + L.cornersSize + '" height="' + L.cornersSize + '"></canvas><canvas id=L_3 width="' + L.cornersSize + '" height="' + L.cornersSize + '"></canvas>';
        with(document.getElementById("L_0").getContext("2d")) {
          beginPath(), fillStyle = L.containerColor, arc(L.cornersSize, L.cornersSize, L.cornersSize, 0, Math.PI, 1), fill()
        }
        with(document.getElementById("L_1").getContext("2d")) {
          beginPath(), fillStyle = L.containerColor, arc(L.cornersSize, 0, L.cornersSize, 0, Math.PI * 2, 1), fill()
        }
        with(document.getElementById("L_2").getContext("2d")) {
          beginPath(), fillStyle = L.containerColor, arc(0, L.cornersSize, L.cornersSize, 0, Math.PI, 1), fill()
        }
        with(document.getElementById("L_3").getContext("2d")) {
          beginPath(), fillStyle = L.containerColor, arc(0, 0, L.cornersSize, 0, Math.PI * 2, 1), fill()
        }
      }
    }
    _leftArrow.innerHTML = _rightArrow.innerHTML = "<b></b>";
    _a(_outer, L.content);
    _a(_outer, _contentOverlay);
    _a(_box, _vertical);
    _a(_box, _vertical2);
    _a(_horizontal, _outer);
    _a(_box, _horizontal);
    _a(_preload, _leftArrow);
    _a(_preload, _rightArrow);
    _a(document.body, _overlay);
    _a(document.body, _preload);
    _a(_preload, _wait);
    _wait.onload = function() {
      _wait.style.cssText = "visibility:hidden;position:absolute;top:50%;left:50%;margin:-" + parseInt(L.cornersSize + _wait.offsetHeight / 2) + "px 0 0 -" + _wait.offsetWidth / 2 + "px";
      _a(_outer, _wait)
    };
    _wait.src = L.path + "wait.gif";
    L.event.execute("onload")
  };
  L.showLoader = function(a) {
    if (L.ready) {
      _wait.style.visibility = "visible", L.animate(_contentOverlay, {
        opacity: 0
      }, L.loaderAppearTime, a)
    }
  };
  L.hideLoader = function(a) {
    L.ready && L.animate(_contentOverlay, {
      opacity: 100
    }, L.loaderDisappearTime, function() {
      _wait.style.visibility = "hidden";
      _eval(a)
    })
  };
  L.hideContent = function(a) {
    if (L.ready) {
      _contentOverlay.style.visibility = "visible", L.animate(_contentOverlay, {
        opacity: 100
      }, L.contentDisappearTime, a)
    }
  };
  L.showContent = function(a) {
    L.ready && L.animate(_contentOverlay, {
      opacity: 0
    }, L.contentAppearTime, function() {
      _contentOverlay.style.visibility = "hidden";
      _eval(a)
    })
  };
  L.destroy = function() {
    if (L.ready) {
      if (!L.opened && !L.animating) {
        _remevent(window, "resize", _onresize);
        _remevent(document, "click", L.travers);
        _remevent(document, "keydown", L.keys);
        _remevent(document.body, "mousemove", _evcatch);
        with(document.body) {
          removeChild(_wrap);
          removeChild(_overlay);
          removeChild(_preload)
        }
        _animator = [];
        L.ready = _overflow = L.bigPanelOpened = L.doAfter = false;
        L.data = L.setName = L.imageName = L.imageDesc = L.cursorPosition = "";
        L.num = _cursorx = _cursory = L.slideshow = _queue = L.imagePrev = L.imageThis = L.imageNext = L.total = 0;
        _eventcash = {
          onerror: [],
          onafterchange: [],
          onbeforechange: [],
          onshow: [],
          onhide: [],
          onscale: [],
          onload: []
        }
      } else {
        L.hide(L.destroy)
      }
    }
  };
  L.recreate = function() {
    L.destroy();
    L.create()
  };
  L.center = function(b, a) {
    if (L.ready) {
      L.animate(_wrap, {
        top: L.cInfo(4),
        left: L.cInfo(3)
      }, !L.opened ? 0 : L.containerCenterTime, function() {
        if (!a) {
          L.animate(_box, {
            top: Math.max(L.cInfo(2) / 2 - _box.offsetHeight / 2 - (L.panelType == 2 ? 18 + L.cornersSize / 2 : 0), 0),
            left: Math.max(L.cInfo(1) / 2 - _box.offsetWidth / 2, 0)
          }, !L.opened ? 0 : L.containerCenterTime, b)
        }
      })
    }
  };
  L.scale = function(b, a, c) {
    if (L.ready && !L.animating) {
      _ie || L.cursorTest(1);
      if (b == _box.offsetWidth && a == _box.offsetHeight) {
        _eval(c);
        L.event.execute("onscale")
      } else {
        L.animating = true;
        _remove();
        if (_opera) {
          L.animate(_wrap, {
            height: Math.max(L.cInfo(2) / 2 - a / 2 - (L.panelType == 2 ? (18 + L.cornersSize / 2) : 0), 0) + a
          }, L.containerResizeTime)
        }
        L.animate(_box, {
          height: a,
          width: b
        }, L.opened ? L.containerResizeTime : 0, function() {
          _paste();
          L.animating = false;
          _eval(c);
          L.event.execute("onscale")
        })
      }
      L.animate(_wrap, {
        top: L.cInfo(4),
        left: L.cInfo(3)
      }, L.containerCenterTime);
      L.animate(_box, {
        left: Math.round(Math.max(L.cInfo(1) / 2 - b / 2, 0)),
        top: Math.round(Math.max(L.cInfo(2) / 2 - a / 2 - (L.panelType == 2 ? (18 + L.cornersSize / 2) : 0), 0))
      }, L.opened ? L.containerResizeTime : 0)
    }
  };
  L.keys = function(a) {
    if (L.keyboard && L.opened) {
      var b = a.keyCode,
        e = String.fromCharCode(b).toLowerCase();
      if (b == 27 || e == "d") {
        _prevent(a), L.hide()
      }
      if (b == 39 || e == "c") {
        _prevent(a), L.next()
      }
      if (b == 37 || e == "g") {
        _prevent(a), L.previous()
      }
      if ((b == 16 || e == "i") && !L.slideshow) {
        _prevent(a), L.play()
      }
      if ((b == 17 || e == "p") && L.slideshow) {
        _prevent(a), L.stop()
      }
      if (b > 48 && b < 58) {
        _prevent(a), L(L.data, L.setName, b - 48)
      }
    }
  };
  L.hideLeftArrow = function(a) {
    if (L.arrows && L.ready) {
      L.animate(_leftArrow, {
        left: 0
      }, L.arrowsTime, function() {
        _preload.appendChild(_leftArrow);
        _eval(a)
      })
    }
  };
  L.hideRightArrow = function(a) {
    if (L.arrows && L.ready) {
      L.animate(_rightArrow, {
        right: 0
      }, L.arrowsTime, function() {
        _preload.appendChild(_rightArrow);
        _eval(a)
      })
    }
  };
  L.showLeftArrow = function(a) {
    if (L.arrows && L.ready) {
      _box.appendChild(_leftArrow), L.animate(_leftArrow, {
        left: -35
      }, L.arrowsTime, a)
    }
  };
  L.showRightArrow = function(a) {
    if (L.arrows && L.ready) {
      _box.appendChild(_rightArrow), L.animate(_rightArrow, {
        right: -35
      }, L.arrowsTime, a)
    }
  };
  L.cursorTest = function(e) {
    if (L.ready && L.total != 1 && L.imageThis) {
      var k = L.imageThis.offsetWidth,
        b = L.imageThis.offsetHeight,
        f = _box.offsetTop + _wrap.offsetTop,
        l = _box.offsetLeft + _wrap.offsetLeft,
        j = L.cornersSize + L.contentPadding,
        h = _cursory > f + j && _cursory < f + b + j ? (_cursorx > l + k / 2 + j && _cursorx < l + k + j ? (L.total > 1 && L.num < L.total ? 1 : 2) : (_cursorx > l + j && _cursorx < l + k / 2 + j ? (L.total > 1 && L.num - 1 > 0 ? 0 : 2) : 2)) : 2;
      if (h != L.cursorPosition || e) {
        L.cursorPosition = h;
        if (h == 2 || e == 1) {
          if (L.imageNav) {
            L.imageThis.style.cursor = "default"
          }
          L.hideLeftArrow();
          L.hideRightArrow()
        } else {
          if (L.imageNav) {
            L.imageThis.style.cursor = "pointer"
          }
          if (h == 1) {
            L.hideLeftArrow();
            L.showRightArrow()
          } else {
            L.hideRightArrow();
            L.showLeftArrow()
          }
        }
      }
    }
  };

  L.create();

  return L;
})();