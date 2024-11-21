import { Comment as CommentType, SanityDocument } from '../types';
import { generateSlug } from './helpers';
import client from './sanity.cli';

export async function getProfileFromEmail(email: string) {
  const emailWithoutDomain = email.split('@')[0]; // Since some of us have .no emails and some have .com emails
  return await client.fetch(`
    *[_type=="employee" && email match "${emailWithoutDomain}"]{ _id, _type, _ref, title, firstName, lastName, image { asset-> } }[0]
  `);
}

export async function getAllPosts() {
  return await client.fetch(`
    *[_type=="toucanPost"] | order(_createdAt desc) { 
      ...,
      tags[] -> {...},
      author -> { 
        firstName,
        lastName,
        image { asset-> },
        _id,
      },
      images[]{ 
        ..., 
        asset -> {...} 
      }
    }
  `);
}

export async function getUserById(id: string) {
  return await client.fetch(
    `*[_type=="employee" && _id=="${id}"]{ _id, _type, _ref, title, firstName, lastName, email,  image { asset-> } }[0]`,
  );
}

export async function getPostById(id: string) {
  return await client.fetch(`
    *[_type=="toucanPost" && _id=="${id}"][0] { ...,
      tags[] -> {...},
      author -> { 
          firstName,
          lastName,
          offices[] -> {...},
          _id,
          image { asset-> },
      },
      images[] { asset -> { ... } },
      comments[] {
        ...,
        createdAt,
        author -> { 
          firstName,
          lastName,
          _id,
          image { asset-> },
      },
      },
    }
  `);
}

export async function getAllTags() {
  return await client.fetch(`*[_type=="tagByUser"]{_id, value, slug}`);
}

export async function getAllPostsByTag(tag: string) {
  return await client.fetch(`*[_type=='toucanPost' && "${tag}" in tags[]->slug.current ] | order(_createdAt desc) { 
      ...,
      tags[] -> {...},
      author -> { 
        firstName,
        lastName,
        image { asset-> },
      },
      images[]{ 
        ..., 
        asset -> {...} 
      }
    }`);
}

export async function getNTags(numberOfTags: number) {
  return await client.fetch(`*[_type=="tagByUser"]{_id, value, slug}[0...${numberOfTags}]`);
}

export async function getPostsByAuthorId(id: string) {
  return await client.fetch(`
    *[_type=="toucanPost" && references("${id}")] | order(_createdAt desc) { 
      ...,
      tags[] -> {...},
      author -> { 
        firstName,
        lastName,
        image { asset-> },
      },
      images[]{ 
        ..., 
        asset -> {...} 
      }
    }
  `);
}
export async function deletePostById(id: string) {
  return await client.delete(id);
}

export async function uploadAsset(type: 'image' | 'file', asset: Blob | File | Buffer) {
  return await client.assets.upload(type, asset);
}

/**
 * Creates a new tag document in Sanity if it doesn't exist
 * If the document already exists, get its ID
 * @param tag The tag to create
 * @returns The ID of the tag
 */
export async function createTag(tag: string): Promise<string> {
  const existingTag = await client.fetch(`*[_type=="tagByUser" && value=="${tag}"]`);

  if (existingTag.length > 0) return existingTag[0]._id;

  let createdDocument = await client.create({
    _type: 'tagByUser',
    value: tag,
    slug: {
      _type: 'slug',
      current: generateSlug(tag),
    },
  });

  return createdDocument._id;
}

export async function addCommentToPost(postId: string, commentText: string, userId: string): Promise<CommentType> {
  const dateNow = new Date();
  let commentData: CommentType = {
    text: commentText,
    author: { _type: 'reference', _ref: userId },
    createdAt: dateNow.toISOString(),
  };
  const res = await client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .insert('after', 'comments[-1]', [commentData])
    .commit({ autoGenerateArrayKeys: true })
    .catch(() => {
      commentData.text = 'Error - something went wrong with your last comment';
    });
  let commentRes = commentData;
  if (res && res.comments && res.comments.length > 0 && res.comments[res.comments.length - 1]._key) {
    commentRes._key = res.comments[res.comments.length - 1]._key;
  }
  return commentRes;
}

export async function deleteCommentInPost(postId: string, commentKey: string): Promise<SanityDocument> {
  return client
    .patch(postId)
    .unset([`comments[_key=="${commentKey}"]`])
    .commit();
}
