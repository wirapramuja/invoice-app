'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { SyntheticEvent, useState } from 'react';

import { createAction } from '@/app/actions';
import SubmitButton from '@/components/SubmitButton';

import Form from 'next/form';
import Container from '@/components/Container';

const NewPage = () => {
  const [state, setState] = useState('ready');

  async function handleOnSubmit(event: SyntheticEvent) {
    if (state === 'pending') {
      event.preventDefault();
    }
    setState('pending');
  }

  return (
    <main className="h-full">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Invoices</h1>
        </div>

        <Form
          onSubmit={handleOnSubmit}
          action={createAction}
          className="grid gap-4 max-w-xs"
        >
          <div>
            <Label htmlFor="name" className="block mb-2 font-semibold text-sm">
              Billing Name
            </Label>
            <Input name="name" id="name" type="text" />
          </div>
          <div>
            <Label htmlFor="email" className="block mb-2 font-semibold text-sm">
              Billing Email
            </Label>
            <Input name="email" id="email" type="email" />
          </div>
          <div>
            <Label htmlFor="value" className="block mb-2 font-semibold text-sm">
              Value
            </Label>
            <Input id="value" name="value" type="text" />
          </div>
          <div>
            <Label
              htmlFor="description"
              className="block mb-2 font-semibold text-sm"
            >
              Description
            </Label>
            <Textarea id="description" name="description" />
          </div>
          <div>
            <SubmitButton />
          </div>
        </Form>
      </Container>
    </main>
  );
};

export default NewPage;
