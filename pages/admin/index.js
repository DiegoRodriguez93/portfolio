import { useState } from "react";
import Head from "next/head";
import LoginScreen from "../../components/admin/LoginScreen";
import BookingsTab from "../../components/admin/BookingsTab";
import BlocksTab from "../../components/admin/BlocksTab";
import ConfigTab from "../../components/admin/ConfigTab";
import ChatsTab from "../../components/admin/ChatsTab";

export default function AdminPage() {
  const [adminPass, setAdminPass] = useState(null);
  const [activeTab, setActiveTab] = useState("bookings");

  if (!adminPass) return <LoginScreen onLogin={setAdminPass} />;

  return (
    <>
      <Head>
        <title>Admin — Diego Rodriguez</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Header */}
        <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Admin Panel</h1>
            <p className="text-gray-500 text-xs">diego-rodriguez.work</p>
          </div>
          <button
            onClick={() => setAdminPass(null)}
            className="text-gray-500 hover:text-white text-sm transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-gray-800">
            {["bookings", "chats", "blocks", "config"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors -mb-px border-b-2 ${activeTab === tab ? "border-red-500 text-white" : "border-transparent text-gray-500 hover:text-gray-300"}`}
              >
                {tab === "blocks" ? "Block Slots" : tab}
              </button>
            ))}
          </div>

          {activeTab === "bookings" && <BookingsTab adminPass={adminPass} />}
          {activeTab === "chats" && <ChatsTab adminPass={adminPass} />}
          {activeTab === "blocks" && <BlocksTab adminPass={adminPass} />}
          {activeTab === "config" && <ConfigTab adminPass={adminPass} />}
        </div>
      </div>
    </>
  );
}

AdminPage.noLayout = true;
