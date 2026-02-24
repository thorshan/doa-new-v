import apiClient from "./apiClient";

export const chapterApi = {
  getChapters: (levelId) =>
    apiClient.get(`/chapters`, {
      params: { levelId },
    }),

  getFullChapter: (id) => apiClient.get(`/chapters/${id}`),

  getChaptersByLevel: (levelId) =>
    apiClient.get(`/chapters?levelId=${levelId}`),
};
