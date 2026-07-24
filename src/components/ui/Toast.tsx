/* eslint-disable react-refresh/only-export-components */
import { useEffect, useSyncExternalStore, type ReactNode } from "react";

type ToastVariant = "success" | "error" | "info" | "warning";

type ToastType = {
  id: string;
  type: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
  actionProps?: {
    children: ReactNode;
    onClick: () => void;
  };
};

type Listener = () => void;

let toasts: ToastType[] = [];
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  console.log("listener", listener);
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return toasts;
}

function addToast(toast: Omit<ToastType, "id">) {
  const id = crypto.randomUUID();
  toasts = [...toasts, { ...toast, id }]; // new array ref — required for useSyncExternalStore to detect change
  notify();
  return id;
}

function closeToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
}

export const toast = {
  success: (
    title: string,
    opts?: Partial<Omit<ToastType, "id" | "type" | "title">>,
  ) => addToast({ type: "success", title, ...opts }),
  error: (
    title: string,
    opts?: Partial<Omit<ToastType, "id" | "type" | "title">>,
  ) => addToast({ type: "error", title, ...opts }),
  info: (
    title: string,
    opts?: Partial<Omit<ToastType, "id" | "type" | "title">>,
  ) => addToast({ type: "info", title, ...opts }),
  warning: (
    title: string,
    opts?: Partial<Omit<ToastType, "id" | "type" | "title">>,
  ) => addToast({ type: "warning", title, ...opts }),
  dismiss: (id: string) => closeToast(id),
};

type ToasterProps = {
  direction?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  timeoutTimeInMS?: number;
};

const directionClasses: Record<string, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-right": "bottom-4 right-4 items-end",
};

export const Toaster = ({
  direction = "bottom-right",
  className = "",
  timeoutTimeInMS = 3000,
}: ToasterProps) => {
  const currentToasts = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <div
      className={`fixed z-50 flex flex-col gap-2 ${directionClasses[direction]} ${className}`}
    >
      {currentToasts.map((t) => (
        <Toast
          key={t.id}
          toast={t}
          onClose={closeToast}
          defaultDuration={timeoutTimeInMS}
        />
      ))}
    </div>
  );
};

type ToastItemProps = {
  toast: ToastType;
  onClose: (id: string) => void;
  defaultDuration: number;
};

const variantStyles: Record<ToastVariant, string> = {
  success: "bg-emerald-600",
  error: "bg-red-600",
  info: "bg-slate-700",
  warning: "bg-amber-600",
};

const Toast = ({ toast, onClose, defaultDuration }: ToastItemProps) => {
  const duration = toast.duration ?? defaultDuration;

  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => onClose(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onClose]);

  return (
    <div
      role="status"
      className={`min-w-70 max-w-sm rounded-lg p-4 text-white shadow-lg ${variantStyles[toast.type]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium">{toast.title}</p>
          {toast.description && (
            <p className="text-sm opacity-90">{toast.description}</p>
          )}
        </div>
        <button
          onClick={() => onClose(toast.id)}
          className="opacity-70 hover:opacity-100"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
      {toast.actionProps && (
        <button
          onClick={toast.actionProps.onClick}
          className="mt-2 text-sm font-semibold underline"
        >
          {toast.actionProps.children}
        </button>
      )}
    </div>
  );
};
