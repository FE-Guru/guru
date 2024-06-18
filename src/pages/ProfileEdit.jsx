import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageInfo } from "../store/pageInfo";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const pageInfo = useMemo(
    () => ({
      menuKR: "마이페이지",
      menuEn: "My Page",
      currentPage: { pageName: "프로필 수정", path: "/mypage/profileEdit" },
    }),
    []
  );
  const currentPage = useSelector((state) => state.pageInfo.currentPage);
  useEffect(() => {
    dispatch(setPageInfo(pageInfo));
  }, [dispatch, pageInfo]);
  return (
    <div className='contents'>
      <h3>{currentPage.pageName}</h3>
      <div className='full'></div>
    </div>
  );
};

export default ProfileEdit;
