export default function Category() {
  return (
    <>
      <div className="breadcrumb">
        <a href="#">MEN</a> <span>›</span> 전체보기
      </div>

      <nav className="category-nav">
        <a href="#" className="active">
          전체보기
        </a>
        <a href="#">티셔츠&탑</a>
        <a href="#">슬리브리스</a>
        <a href="#">쇼츠</a>
        <a href="#">팬츠</a>
        <a href="#">아우터</a>
        <a href="#">스웜웨어</a>
        <a href="#">스웨트 셔츠&후드</a>
        <a href="#">스웨트 팬츠</a>
      </nav>
    </>
  );
}
