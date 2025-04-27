// app/orders/page.tsx
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export default async function OrdersPage() {
  // 1) Ensure user is signed in
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  // 2) Fetch this user’s orders with items and products
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven’t placed any orders yet.</p>
      ) : (
        orders.map((order) => {
          const createdAt = format(order.createdAt, "PPP p");
          const itemsTotal = order.items.reduce(
            (sum, it) => sum + it.price * it.quantity,
            0
          );
          // Pick a color based on status
          const statusStyles = {
            pending:   "bg-yellow-200 text-yellow-800",
            shipped:   "bg-blue-200 text-blue-800",
            delivered: "bg-green-200 text-green-800",
          } as const;
          const pillClass = statusStyles[order.status as keyof typeof statusStyles] 
            ?? "bg-gray-200 text-gray-800";

          return (
            <div
              key={order.id}
              className="border rounded-lg shadow-sm overflow-hidden"
            >
              {/* Header with order number, date, status */}
              <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                <div>
                  <span className="font-medium">Order #{order.id}</span>
                  <span className="ml-4 text-sm text-gray-600">{createdAt}</span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${pillClass}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>

              {/* Order details */}
              <div className="p-4 space-y-4">
                {/* Shipping info */}
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {order.house}, {order.building}, {order.landmark}, {order.city}, {order.state} –{" "}
                    {order.pincode}
                  </p>
                </div>

                {/* Items list */}
                <div className="space-y-3 border-t">
                    <div className="text-lg font-semibold">Products</div>
                  {order.items.map((it) => (
                    <div
                      key={it.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-sm">{it.product.name}</p>
                        <p className="text-gray-600 text-sm">
                          ₹{it.price} × {it.quantity}
                        </p>
                      </div>
                      <div className="font-semibold">
                        ₹{it.price * it.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{itemsTotal}</span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
