type UserProfile = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  title?: string;
  image: Ref<Image>;
};

type SanityDocument = {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _key?: string;
};

export type TagByUser = SanityDocument & {
  value: string;
  slug: string;
};

export type Ref<T> = SanityDocument &
  T & {
    _ref: string;
  };

export type User = SanityDocument & {
  email: string;
  firstName: string;
  lastName: string;
  image: Ref<Image>;
  offices: Office[];
};

type Office = {};

export type Image = SanityDocument & {
  _type: 'image';
  asset: {
    url: string;
    uploadId: string;
    path: string;
    size: number;
    metadata: {
      dimensions: {
        aspectRatio: number;
        height: number;
        width: number;
      };
    };
  };
};

export type Post = SanityDocument & {
  title: string;
  description: string;
  images: Ref<Image>[];
  author: Ref<User>;
  comments: Comment[];
  tags: TagByUser[];
};

export interface Comment {
  text: string;
  author: Ref<User> | { _type: string; _ref: string };
  createdAt: string;
  _key?: string;
}
