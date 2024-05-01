function loadImg(img, url, opts = {}) {
  const { retry = 3, onSuccess, onFail } = opts;
  let count = 0;
  img.src = url;

  if (img.getAttribute("loading") === "true") return;

  img.setAttribute("loading", true);

  img.onload = () => {
    img.removeAttribute("loading");

    onSuccess && onSuccess.call(null);
  };

  img.onerror = () => {
    if (count < retry) {
      count++;
      img.src = `${url}?retry=${count}`;
    } else {
      img.removeAttribute("loading");

      onFail && onFail.call(null);
    }
  };
}

function observer(imgsEl, urlKey = "_src") {
  const observer = new IntersectionObserver(
    (entries, observe) => {
      for (let entry of entries) {
        const { target, isIntersecting } = entry;
        if (isIntersecting) {
          if (target instanceof Image)
            loadImg(target, target.getAttribute(urlKey), {
              onSuccess: () => {
                target.removeAttribute(urlKey);
                observe.unobserve(target);
              },
            });
        }
      }
    },
    {
      rootMargin: "0px 0px 100% 0px",
    }
  );

  imgsEl.forEach((el) => observer.observe(el));
}

export function lazyImg(imgs, opts = {}) {
  const { urlKey = "_src" } = opts;
  observer(imgs, urlKey);
}
