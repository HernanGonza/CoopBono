import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from '@/components/ui/dialog';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const onOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value && status !== 'sending') setStatus('idle');
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="max-w-xl gap-3 p-5 sm:p-6">
      {status === 'sent' ? <div className="success-state">
        <CheckCircle2 size={42} aria-hidden="true" />
        <DialogTitle asChild><h3>¡Mensaje enviado!</h3></DialogTitle>
        <DialogDescription>Recibimos tu consulta y te respondemos a la brevedad para coordinar la reunión.</DialogDescription>
        <DialogClose asChild><Button>Cerrar</Button></DialogClose>
      </div> : <>
        <DialogHeader>
          <DialogTitle>Coordinar una reunión</DialogTitle>
          <DialogDescription>Contanos quién sos y cuándo te viene bien. Te respondemos desde hola@tacuara.com.ar.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-3.5 sm:grid-cols-2 [&_textarea]:min-h-[72px]" onSubmit={submit}>
          <label className="field">Nombre y apellido<input name="nombre" required maxLength={120} autoComplete="name" /></label>
          <label className="field">Correo electrónico<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
          <label className="field sm:col-span-2"><span>Organismo o cargo <span className="font-normal text-muted-foreground">(opcional)</span></span><input name="organismo" maxLength={160} autoComplete="organization" /></label>
          <label className="field sm:col-span-2">Mensaje<textarea name="mensaje" rows={2} required maxLength={5000} placeholder="Ej.: nos gustaría ver la demo la semana próxima." /></label>
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
            <label>No completar<input name="web" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <Button type="submit" size="proposal" className="sm:col-span-2" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : <>Enviar mensaje <ArrowRight /></>}</Button>
          <p role="status" aria-live="polite" className="demo-subtitle !mt-0 sm:col-span-2 empty:hidden">{status === 'error' && 'No pudimos enviarlo. Probá de nuevo o escribinos a hola@tacuara.com.ar.'}</p>
        </form>
      </>}
    </DialogContent>
  </Dialog>;
}
