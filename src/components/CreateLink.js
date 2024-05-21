import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';


const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $url: String!
    $description: String!
    $autor: String!
    $likes: Int!
  ) {
    createLink(url: $url, description: $description, autor: $autor, likes: $likes) {
      id
      url
      description
      autor
      likes
    }
  }
`;

const CreateLink = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
     url: '',
     description: '',
     autor: '',
     likes: 0,
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      url: formState.url,
      description: formState.description,
      autor: formState.autor,
      likes: formState.likes
    },
    onCompleted: () => navigate('/')
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="URL de la foto"
          />
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value
              })
            }
            type="text"
            placeholder="Descripcion de la foto"
          />
          <input
            className="mb2"
            value={formState.autor}
            onChange={(e) =>
              setFormState({
                ...formState,
                autor: e.target.value
              })
            }
            type="text"
            placeholder="Autor de la foto"
          />
          <input
            className="mb2"
            value={formState.likes}
            onChange={(e) =>
              setFormState({
                ...formState,
                likes: e.target.value
              })
            }
            type="number"
            placeholder="Likes de la foto"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;