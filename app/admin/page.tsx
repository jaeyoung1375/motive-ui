export default function AdminPage() {
  return (
    <>
      {/* Main Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold">관리자 메인</h1>
          <div className="text-sm text-gray-600">admin@company.com</div>
        </header>

        {/* Content */}
        <section className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="상품 수" value="128" />
            <Card title="게시글" value="54" />
            <Card title="오늘 로그" value="1,024" />
          </div>
        </section>
      </main>
    </>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}
