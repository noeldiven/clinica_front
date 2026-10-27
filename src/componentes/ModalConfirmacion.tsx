
interface ModalConfirmacionProps {
  abierto: boolean
  titulo: string
  mensaje: string
  confirmando: boolean
  textoConfirmar?: string
  onCancelar: () => void
  onConfirmar: () => void
}

export default function ModalConfirmacion({
  abierto,
  titulo,
  mensaje,
  confirmando,
  textoConfirmar = 'Eliminar paciente',
  onCancelar,
  onConfirmar,
}: ModalConfirmacionProps) {
  if (!abierto) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !confirmando
        ) {
          onCancelar()
        }
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-confirmacion-titulo"
        aria-describedby="modal-confirmacion-mensaje"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-2xl">
          ⚠️
        </div>

        <h2
          id="modal-confirmacion-titulo"
          className="text-xl font-bold text-slate-900"
        >
          {titulo}
        </h2>

        <p
          id="modal-confirmacion-mensaje"
          className="mt-2 text-sm leading-6 text-slate-600"
        >
          {mensaje}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancelar}
            disabled={confirmando}
            className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirmar}
            disabled={confirmando}
            className="rounded-lg bg-rose-600 px-4 py-2.5 font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {confirmando ? 'Eliminando…' : textoConfirmar}
          </button>
        </div>
      </section>
    </div>
  )
}
