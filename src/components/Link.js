import React from 'react';
import { AUTH_TOKEN } from '../constants';
import { useMutation, gql } from '@apollo/client';
import './../styles/gallery.css';

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: Int!) {
    createVote(linkId: $linkId) {
      link {
        id
        url
        description
        autor
        likes
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Link = (props) => {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
  });

  return (
    <div className="gallery-item">
      <img src={link.url} alt="Descripción de la imagen" />
      <div className="description">Descripción: {link.description}</div>
      <div className="author">Autor: {link.autor}</div>
      <div className="likes">
        Likes: {link.likes}
        <div className="like-icon" onClick={vote}>
          Like
        </div>
      </div>
      {authToken && (
        <div className="vote-info">
          {link.votes.length} votes | by{' '}
          {link.postedBy ? link.postedBy.username : 'Unknown'}{' '}
        </div>
      )}
    </div>
  );
};

export default Link;