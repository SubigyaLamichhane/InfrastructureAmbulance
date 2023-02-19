import { useRouter } from 'next/router';
import React from 'react';
import HeaderText from '../components/Base/HeaderText';
import StandardButton from '../components/buttons/StandardButton';
import Map from '../components/Map';
import Navbar from '../components/Navbar';

import { Image, CloudinaryContext } from 'cloudinary-react';
import { connect } from 'react-redux';
import { useComplainsQuery, useMeQuery } from '../generated/graphql';
import { StoreStateI } from '../store/reducers';
import { setYellowDotMarker } from '../utils/getMap';
import { isServer } from '../utils/isServer';

interface IndexHelperProps {}

const IndexHelper: React.FC<IndexHelperProps> = ({}) => {
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
        <div className="">
          <Navbar />

          <HeaderText>Complains:</HeaderText>
          <div className="flex mt-4">
            {data && <Map></Map>}
            <div
              className="
                w-full 
                ml-11 
                overflow-hidden 
                lg:overflow-auto 
                scrollbar:!w-1.5 
                scrollbar:!h-1.5 
                scrollbar:bg-transparent 
                scrollbar-track:!bg-slate-100 
                scrollbar-thumb:!rounded 
                scrollbar-thumb:!bg-slate-300 
                scrollbar-track:!rounded 
                dark:scrollbar-track:!bg-slate-500/[0.16] 
                dark:scrollbar-thumb:!bg-slate-500/50 
                max-h-[500px] 
                supports-scrollbars:pr-2 
              "
            >
              {data &&
                data.complains.complains.map((complain) => {
                  setYellowDotMarker(complain.latitude, complain.longitude);
                  return (
                    <div
                      onClick={() => router.push('/complain/' + complain.id)}
                      key={complain.id}
                      className="
                w-full
                mt-4
                border-2
                rounded-standard 
              border-black 
                p-8
              "
                    >
                      <CloudinaryContext cloudName="infrastructure-ambulance">
                        <div>
                          {complain.imagePublicId && (
                            <Image
                              publicId={complain.imagePublicId}
                              width="500"
                              alt="complain-picture"
                            />
                          )}
                        </div>
                      </CloudinaryContext>
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
                            <span className="text-gray-600">
                              {complain.wardNo}
                            </span>
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
                  );
                })}

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
          </div>
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

const mapStateToProps = ({ mapLoadedForm }: StoreStateI) => {
  return { mapLoadedForm };
};

export default connect(mapStateToProps, {})(IndexHelper) as any;
