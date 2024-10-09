'use client';

import { Badge } from '@/components/ui/badge';
import { Customers, Invoices } from '@/db/schema';
import { cn } from '@/lib/utils';
import { useOptimistic } from 'react';

import React from 'react';
import Container from '@/components/Container';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AVAILABLE_STATUSES } from '@/data/invoices';
import { deleteInvoiceAction, updateStatusAction } from '@/app/actions';
import { ChevronDown, CreditCard, Ellipsis, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import Link from 'next/link';

interface InvoiceProps {
  invoice: typeof Invoices.$inferSelect & {
    customer: typeof Customers.$inferSelect;
  };
}

const Invoice = ({ invoice }: InvoiceProps) => {
  const [currentStatus, setCurrentStatus] = useOptimistic(
    invoice.status,
    (_state, newStatus) => {
      return String(newStatus);
    }
  );

  async function handleOnUpdateStatus(formData: FormData) {
    const originalStatus = currentStatus;
    setCurrentStatus(formData.get('status'));
    try {
      await updateStatusAction(formData);
    } catch {
      setCurrentStatus(originalStatus);
    }
  }

  return (
    <main className="w-full my-12 h-full">
      <Container>
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl flex items-center gap-4 font-bold">
            Invoices #{invoice.id}
            <Badge
              className={cn(
                'rounded-full capitalize',
                invoice.status === 'open' && 'bg-blue-500',
                invoice.status === 'paid' && 'bg-green-600',
                invoice.status === 'void' && 'bg-zinc-700',
                invoice.status === 'uncollectible' && 'bg-red-600'
              )}
            >
              {invoice.status}
            </Badge>
          </h1>

          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2" variant={'outline'}>
                  Change Status
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {AVAILABLE_STATUSES.map((status) => {
                  return (
                    <DropdownMenuItem key={status.id}>
                      <form action={handleOnUpdateStatus}>
                        <input type="hidden" name="id" value={invoice.id} />
                        <input type="hidden" name="status" value={status.id} />
                        <button type="submit" className="block">
                          {status.label}
                        </button>
                      </form>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="flex items-center gap-2"
                    variant="outline"
                    type="button"
                  >
                    <span className="sr-only">More Options</span>
                    <Ellipsis className="w-4 h-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-2" type="submit">
                        <Trash2 className="w-4 h-auto" />
                        Delete Invoice
                      </button>
                    </DialogTrigger>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link
                      href={`/invoices/${invoice.id}/payment`}
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-auto" />
                      Payment
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    Delete Invoice?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your invoice and remove your data from our servers.
                  </DialogDescription>
                  <DialogFooter>
                    <form
                      className="flex justify-center"
                      action={deleteInvoiceAction}
                    >
                      <input type="hidden" name="id" value={invoice.id} />
                      <Button
                        variant="destructive"
                        className="flex items-center gap-2"
                        type="submit"
                      >
                        <Trash2 className="w-4 h-auto" />
                        Delete Invoice
                      </Button>
                    </form>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <p className="text-3xl mb-3">${(invoice.value / 100).toFixed(2)}</p>
        <p className="text-lg mb-8"></p>
        <h2 className="font-bold text-lg mb-4">Billing Details</h2>
        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{invoice.id}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>
            <span>{new Date(invoice.createTs).toLocaleDateString()}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            <span>{invoice.customer.name}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            <span>{invoice.customer.email}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
};

export default Invoice;
