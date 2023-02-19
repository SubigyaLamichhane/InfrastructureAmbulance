import { useRouter } from 'next/router';
import React from 'react';
import HeaderText from '../../components/Base/HeaderText';
import StandardButton from '../../components/buttons/StandardButton';
import Navbar from '../../components/Navbar';

import { useComplainsByUserQuery, useUserQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import { withApollo } from '../../utils/withApollo';

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: userData, loading: userLoading } = useUserQuery({
    variables: {
      id: parseInt(id as string),
    },
  });
  const { data, loading, fetchMore, variables } = useComplainsByUserQuery({
    variables: {
      limit: 15,
      userId: parseInt(id as string),
      cursor: null,
    },
  });

  if (!loading && !data) {
    return <div>There are no Complains</div>;
  }
  if (loading && userLoading) {
    return <div>Loading ...</div>;
  }
  if (!userLoading && !userData.user.user) {
    return <div>The user with id: {id} does not exist.</div>;
  }

  return (
    <div>
      <Navbar />

      <HeaderText>User Profile</HeaderText>
      <div className="flex  border-b-2 border-t-2 border-black mt-4">
        <div className="mr-4 mb-10 mt-10">
          <h3 className="text-lg font-semibold">Username:</h3>
          <h3 className="text-lg font-semibold">Name:</h3>
          <h3 className="text-lg font-semibold">Email:</h3>
          <h3 className="text-lg font-semibold">Phone Number:</h3>
          <h3 className="text-lg font-semibold">Ward Number:</h3>
        </div>
        <div className="mt-10">
          <h3 className="text-lg font-semibold">
            {userData.user.user.username}
          </h3>
          <h3 className="text-lg font-semibold">
            {userData.user.user.firstname + ' ' + userData.user.user.lastname}
          </h3>
          <h3 className="text-lg font-semibold">{userData.user.user.email}</h3>
          <h3 className="text-lg font-semibold">
            {userData.user.user.phonenumber}
          </h3>
          <h3 className="text-lg font-semibold">{userData.user.user.wardNo}</h3>
        </div>
      </div>

      {data &&
        data.complainsByUser.complains.map((complain) => (
          <div
            key={complain.id}
            className="
                w-full
                mt-4
                border-2
                rounded-standard 
              border-black 
                p-2
              "
          >
            <h2
              className="
                  text-xl
                  font-semibold
                "
            >
              {complain.title}
            </h2>
            <p>{complain.descriptionSnippet}</p>
            <div className="mt-2 flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Ward Number:{' '}
                  <span className="text-gray-600">{complain.wardNo}</span>
                </h3>
              </div>
            </div>
          </div>
        ))}

      {data && data.complainsByUser.hasMore ? (
        <div className="flex my-4">
          <div className="m-auto my-4">
            <StandardButton
              onClick={() =>
                fetchMore({
                  variables: {
                    limit: variables!.limit,
                    cursor:
                      data.complainsByUser.complains[
                        data.complainsByUser.complains.length - 1
                      ].createdAt,
                  },
                })
              }
            >
              Load More
            </StandardButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default withApollo({ ssr: true })(Index);
