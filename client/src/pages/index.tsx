import { useRouter } from 'next/router';
import React from 'react';
import HeaderText from '../components/Base/HeaderText';
import StandardButton from '../components/buttons/StandardButton';
import Navbar from '../components/Navbar';

import { useComplainsQuery, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { withApollo } from '../utils/withApollo';

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const router = useRouter();
  const { data, loading, fetchMore, variables } = useComplainsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
  });
  const { data: meData, loading: MeLoading } = useMeQuery({
    skip: isServer(),
  });

  if (!loading && !data) {
    return <div>There are no Complains</div>;
  }

  if (!MeLoading && meData) {
    if (meData.me) {
      return (
        <div>
          <Navbar />

          <HeaderText>Complaints:</HeaderText>

          {data &&
            data.complains.complains.map((complain) => (
              <div
                onClick={() => router.push('/complain/' + complain.id)}
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
                  <div>
                    <h3 className="text-lg font-semibold">
                      Posted By:{' '}
                      <span
                        onClick={() =>
                          router.push('/profile/' + complain.user.user.id)
                        }
                        className="text-gray-600"
                      >
                        {complain.user.user.username}
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            ))}

          {data && data.complains.hasMore ? (
            <div className="flex my-4">
              <div className="m-auto my-4">
                <StandardButton
                  onClick={() =>
                    fetchMore({
                      variables: {
                        limit: variables!.limit,
                        cursor:
                          data.complains.complains[
                            data.complains.complains.length - 1
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
    } else {
      return (
        <div>
          <Navbar />
          Marketing Page
        </div>
      );
    }
  }

  return <div>Loading ...</div>;
};

export default withApollo({ ssr: true })(Index);
