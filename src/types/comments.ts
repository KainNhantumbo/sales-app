export type TCommentForm = {
  createComment: () => Promise<void>;
  updateComment: (id: string) => Promise<void>;
  replyComment: () => Promise<void>;
  currentCommentId: string;
  status: {
    edit: boolean;
    reply: boolean;
    loading: {
      status: boolean;
      key: 'create-comment' | 'update-comment' | 'delete-comment';
    };
    error: {
      status: boolean;
      msg: string;
      key: 'create-comment' | 'update-comment' | 'delete-comment';
    };
  };
};

export type TComment = {
  comment: IComment;
  clearCommentData: () => void;
  updateComment: (id: string) => Promise<void>;
  handleUnFavoriteComment: (id: string) => Promise<void>;
  handleFavoriteComment: (id: string) => Promise<void>;
  handleReplyComment: (data: IComment) => void;
  handleEditComment: (data: IComment) => void;
  status: {
    edit: boolean;
    reply: boolean;
    loading: {
      status: boolean;
      key: 'create-comment' | 'update-comment' | 'delete-comment';
    };
    error: {
      status: boolean;
      msg: string;
      key: 'create-comment' | 'update-comment' | 'delete-comment';
    };
  };
};

export interface IComment {
  _id: string;
  source_id: string;
  created_by: {
    _id: string;
    first_name: string;
    last_name: string;
    profile_image: { id: string; url: string };
  };
  content: string;
  parent_id: string;
  favorites: string[];
  updatedAt: string;
  createdAt: string;
}
