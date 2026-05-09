import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

export const showSuccess = (title, text) => {
  // تشغيل تأثير نثرات الهدايا
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);

  return Swal.fire({
    title: title || 'تم بنجاح!',
    text: text || '',
    icon: 'success',
    confirmButtonText: 'ممتاز',
    confirmButtonColor: '#082e71',
    customClass: {
      popup: 'animated bounceIn'
    },
    timer: 3000,
    timerProgressBar: true
  });
};

export const showError = (title, text) => {
  return Swal.fire({
    title: title || 'خطأ!',
    text: text || 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.',
    icon: 'error',
    confirmButtonText: 'إغلاق',
    confirmButtonColor: '#dc3545',
    customClass: {
      popup: 'animated shake'
    }
  });
};

export const showConfirm = (title, text) => {
  return Swal.fire({
    title: title || 'هل أنت متأكد؟',
    text: text || 'لن تتمكن من التراجع عن هذا الإجراء!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#082e71',
    cancelButtonColor: '#d33',
    confirmButtonText: 'نعم، قم بالتنفيذ',
    cancelButtonText: 'إلغاء'
  });
};
