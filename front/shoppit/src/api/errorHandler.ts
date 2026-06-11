import { AxiosError } from 'axios';

export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = 'Произошла ошибка',
): string => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data as {
      message?: string;
      error?: string;
    };

    const serverMessage = data?.message || data?.error;

    if (status) {
      const statusMessages: Record<number, string> = {
        400: serverMessage || 'Неверный запрос',
        401: 'Требуется авторизация',
        403: 'Доступ запрещен',
        404: 'Страница не найдена',
        409: 'Конфликт данных',
        422: 'Ошибка валидации',
        429: 'Слишком много запросов',
        500: 'Ошибка сервера',
        502: 'Проблемы с подключением',
        503: 'Сервис временно недоступен',
        504: 'Таймаут соединения',
      };

      return statusMessages[status] || `Ошибка ${status}`;
    }

    if (error.request && !error.response) {
      return 'Нет ответа от сервера. Проверьте подключение';
    }

    return error.message || 'Ошибка запроса';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
};
