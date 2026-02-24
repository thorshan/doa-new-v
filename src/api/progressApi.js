import apiClient from "./apiClient";

export const progressApi = {
  updateModuleStatus: (levelTag, chapterId, moduleKey) =>
    apiClient.patch(`/progress/update-module`, {
      levelTag,
      chapterId,
      moduleKey,
    }),
  completeChapterTest: (payload) =>
    apiClient.post("/progress/complete-chapter-test", payload),

  getCourseProgress: (levelTag) =>
    apiClient.get(`/progress/course/${levelTag}`),
};
