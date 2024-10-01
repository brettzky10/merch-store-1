import { getOrders } from '@/lib/actions/orders'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default async function OrdersDashboard() {
  const orders = await getOrders()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Orders Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>External ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.externalId}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.recipientName}</TableCell>
                  <TableCell>{`${order.totalCost} ${order.currency}`}</TableCell>
                  <TableCell>{order.createdAt.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}