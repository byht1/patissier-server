import { ECourseType } from 'src/db-schemas/course.schema';

export const filterCourses = (type: string): { type: ECourseType } | undefined => {
  if (!type) return;
  const courseType = ECourseType[type.toUpperCase() as keyof typeof ECourseType];

  return { type: courseType };
};
