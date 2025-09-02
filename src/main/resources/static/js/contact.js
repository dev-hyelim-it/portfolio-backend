// DOM 로드 완료 후 실행
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("from");
  const messageInput = document.getElementById("message");
  const responseEl = document.getElementById("response");

  // form 요소 없으면 조용히 종료 (다른 페이지 대응)
  if (!form || !nameInput || !emailInput || !messageInput) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      from: emailInput.value,
      subject: `Contact from ${nameInput.value}`,
      message: messageInput.value
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const resultText = await res.text();

      if (responseEl) {
        responseEl.textContent = resultText;
        responseEl.style.color = res.ok ? "lightgreen" : "tomato";
      } else {
        alert(resultText);
      }

      if (res.ok) {
        // 폼 초기화
        form.reset();
      }

    } catch (error) {
      console.error("메일 전송 중 오류 발생:", error);
      if (responseEl) {
        responseEl.textContent = "⚠️ 오류가 발생했습니다.";
        responseEl.style.color = "tomato";
      } else {
        alert("⚠️ 오류가 발생했습니다.");
      }
    }
  });
});
