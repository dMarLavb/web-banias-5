document.addEventListener("DOMContentLoaded", () => {
  /*  // === ЗАВДАННЯ 1: Поміняти місцями контент блоків «2» та «5» ===
  function swapBlocks() {
    const block2 = document.querySelector(".block-2");
    const block5 = document.querySelector(".block-5");

    if (block2 && block5) {
      const tempContent = block2.innerHTML;
      block2.innerHTML = block5.innerHTML;
      block5.innerHTML = tempContent;
      console.log("Blocks 2 and 5 swapped.");
    }
  }
  swapBlocks();

  // === ЗАВДАННЯ 2: Площа п’ятикутника ===
  function calculatePentagonArea() {
    const block4 = document.querySelector(".block-4");
    if (!block4) return;

    // Змінна (довжина сторони)
    const side = 10;
    // Формула: (5 * a^2) / (4 * tg(36 градусів))
    const area = (5 * Math.pow(side, 2)) / (4 * Math.tan(Math.PI / 5));

    const resultDiv = document.createElement("div");
    resultDiv.style.marginTop = "20px";
    resultDiv.style.borderTop = "1px dashed #333";
    resultDiv.style.paddingTop = "10px";
    resultDiv.innerHTML = `<strong>Завдання 2:</strong><br>Площа п'ятикутника зі стороною ${side} = ${area.toFixed(
      2
    )}`;

    block4.appendChild(resultDiv);
  }
  calculatePentagonArea();
  
  // === ЗАВДАННЯ 3: Перевертання числа (Cookies) ===
  function handleNumberReversal() {
    const block4 = document.querySelector(".block-4");
    const cookieName = "reversedNumber";

    // Функції для роботи з Cookies
    function setCookie(name, value, days) {
      const d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
      let nameEQ = name + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    function deleteCookie(name) {
      document.cookie = name + "=; Max-Age=-99999999;";
    }

    // Логіка перевірки Cookies
    const savedValue = getCookie(cookieName);

    if (savedValue) {
      // а) Якщо кукі є - показати, видалити, перезавантажити
      const confirmDelete = confirm(
        `Збережене число: ${savedValue}. \nНатисніть ОК, щоб видалити дані з cookies.`
      );
      if (confirmDelete) {
        deleteCookie(cookieName);
        alert("Cookies видалено!");
        location.reload(); // Перезавантаження сторінки
      }
    } else {
      // б) Якщо кукі немає - вивести форму
      const formContainer = document.createElement("div");
      formContainer.innerHTML = `
                <hr>
                <strong>Завдання 3 (Перевертання числа):</strong><br>
                <input type="number" id="numberInput" placeholder="Введіть число (напр. 125)">
                <button id="reverseBtn">Перевернути</button>
            `;
      block4.appendChild(formContainer);

      document.getElementById("reverseBtn").addEventListener("click", () => {
        const input = document.getElementById("numberInput").value;
        if (input) {
          const reversed = input.split("").reverse().join("");
          alert(`Перевернуте число: ${reversed}`);
          setCookie(cookieName, reversed, 7); // Зберігаємо на 7 днів
          location.reload(); // Перезавантаження, щоб спрацювала логіка "а"
        } else {
          alert("Будь ласка, введіть число");
        }
      });
    }
  }
  handleNumberReversal();
  
  // === ЗАВДАННЯ 4: Зміна кольору рамок (LocalStorage) ===
  function handleBorderColor() {
    const block4 = document.querySelector(".block-4");
    const storageKey = "blockBorderColor";

    // Створення контролу для вибору кольору
    const colorControl = document.createElement("div");
    colorControl.innerHTML = `
            <hr>
            <strong>Завдання 4 (Колір рамок 1..7):</strong><br>
            <input type="color" id="borderColorPicker">
            <button id="saveColorBtn">Змінити колір</button>
        `;
    block4.appendChild(colorControl);

    // Функція застосування кольору
    function applyBorderColor(color) {
      // Вибираємо всі блоки, що мають клас, який починається на block- (крім x та y, якщо треба)
      // Але в завданні сказано 1..7. Перерахуємо їх явно або через цикл.
      const blocks = document.querySelectorAll(
        ".block-1, .block-2, .block-3, .block-4, .block-5, .block-6, .block-7"
      );
      blocks.forEach((block) => {
        block.style.border = `2px solid ${color}`;
      });
    }

    // Перевірка LocalStorage при завантаженні
    const savedColor = localStorage.getItem(storageKey);
    if (savedColor) {
      applyBorderColor(savedColor);
      document.getElementById("borderColorPicker").value = savedColor;
    }

    // Обробка кліку
    document.getElementById("saveColorBtn").addEventListener("click", () => {
      const color = document.getElementById("borderColorPicker").value;
      applyBorderColor(color);
      localStorage.setItem(storageKey, color);
    });
  }
  handleBorderColor();
  */
  // === ЗАВДАННЯ 5: CSS редактор (ВИПРАВЛЕНО) ===
  function handleCssEditor() {
    const blockX = document.querySelector(".block-x");
    const block4 = document.querySelector(".block-4");

    // Створюємо (або знаходімо) спеціальний стиль-блок для наших правил
    let styleTag = document.getElementById("custom-css-style");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "custom-css-style";
      document.head.appendChild(styleTag);
    }

    // Функція, яка бере дані з LocalStorage і застосовує їх на сторінці
    function renderSavedRules() {
      const rules = JSON.parse(localStorage.getItem("customCssRules")) || [];
      let cssString = "";

      rules.forEach((item) => {
        // Формуємо CSS рядок: селектор { правило }
        // Обмежуємо дію правилами всередині блоків 1..7 для безпеки, або глобально як просив користувач
        cssString += `${item.selector} { ${item.rule} } \n`;
      });

      // Оновлюємо вміст тегу <style>, це миттєво застосовує зміни
      styleTag.innerHTML = cssString;
    }

    // Запускаємо при завантаженні сторінки, щоб відновити збережені стилі
    renderSavedRules();

    if (!blockX) return;

    // а) Клік на блоці «х» викликає форму
    blockX.addEventListener("click", () => {
      // Перевірка, щоб не створювати форму двічі
      if (document.getElementById("cssEditorForm")) return;

      const formDiv = document.createElement("div");
      formDiv.id = "cssEditorForm";
      formDiv.style.border = "2px solid #007bff";
      formDiv.style.padding = "15px";
      formDiv.style.marginTop = "20px";
      formDiv.style.backgroundColor = "#e9ecef";

      formDiv.innerHTML = `
                <strong>Завдання 5 (CSS Редактор):</strong><br><br>
                <label>Селектор (напр. p, .block-1, h2): </label><br>
                <input type="text" id="cssSelector" style="width: 100%; margin-bottom: 5px;"><br>
                
                <label>CSS властивість (напр. color: red; font-size: 20px;): </label><br>
                <input type="text" id="cssRule" style="width: 100%; margin-bottom: 10px;"><br>
                
                <div style="display: flex; gap: 10px;">
                    <button id="applyCssBtn" style="flex: 1; cursor: pointer; padding: 5px;">Кнопка «1» (Зберегти)</button>
                    <button id="clearCssBtn" style="flex: 1; cursor: pointer; padding: 5px; background-color: #dc3545; color: white; border: none;">Кнопка «2» (Видалити)</button>
                </div>
            `;

      block4.appendChild(formDiv);

      // б) Обробка кнопки «1» (ЗБЕРЕГТИ)
      document.getElementById("applyCssBtn").addEventListener("click", () => {
        const selector = document.getElementById("cssSelector").value;
        const rule = document.getElementById("cssRule").value;

        if (selector && rule) {
          const rules =
            JSON.parse(localStorage.getItem("customCssRules")) || [];
          rules.push({ selector, rule });

          localStorage.setItem("customCssRules", JSON.stringify(rules));
          renderSavedRules(); // Оновлюємо вигляд сторінки

          alert("CSS правило додано!");
          // Очистити поля для зручності
          document.getElementById("cssSelector").value = "";
          document.getElementById("cssRule").value = "";
        } else {
          alert("Будь ласка, заповніть обидва поля.");
        }
      });

      // в) Обробка кнопки «2» (ВИДАЛИТИ ВСЕ)
      document.getElementById("clearCssBtn").addEventListener("click", () => {
        // 1. Видаляємо з LocalStorage
        localStorage.removeItem("customCssRules");

        // 2. Оновлюємо вигляд (функція побачить, що сховище пусте, і очистить стилі)
        renderSavedRules();

        alert("Всі CSS правила видалено, вплив припинено!");
      });
    });
  }
  handleCssEditor();
});
