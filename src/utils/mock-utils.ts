import {datatype, internet, lorem} from 'faker';

export const getMockComment = () => ({
  id: datatype.uuid(),
  date: datatype.datetime().toString(),
  user: {
    name: internet.userName(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean()
  },
  comment: lorem.paragraph(),
  rating: datatype.number(5)
});
