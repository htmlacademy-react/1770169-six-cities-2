import {render, screen} from '@testing-library/react';

import ReviewCard from './review-card';
import {getMockComment} from '../../utils/mock-utils';

describe('Component: ReviewCard', () => {
  const comment = getMockComment();

  it('should render ReviewCard component', () => {
    render(<ReviewCard review={comment} />);

    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
    expect(screen.getByText(comment.user.name)).toBeInTheDocument();
    expect(screen.getByText(comment.comment)).toBeInTheDocument();
  });
});
