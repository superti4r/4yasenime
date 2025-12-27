"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

export function Dialog(props: React.ComponentProps<typeof BaseDialog.Root>) {
  return <BaseDialog.Root data-slot="dialog" {...props} />;
}

export function DialogTrigger(
  props: React.ComponentProps<typeof BaseDialog.Trigger>
) {
  const { children, ...rest } = props;
  return (
    <BaseDialog.Trigger data-slot="dialog-trigger" {...rest}>
      {children}
    </BaseDialog.Trigger>
  );
}

export function DialogPopup(
  props: React.ComponentProps<typeof BaseDialog.Popup>
) {
  const { className, children, ...rest } = props;

  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop
        className={cn(
          "fixed inset-0 z-[200] min-h-dvh bg-black/60 transition-[color,opacity] backdrop-blur-sm",
          "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0"
        )}
      />
      <BaseDialog.Popup
        data-slot="dialog-popup"
        {...rest}
        className={cn(
          "fixed left-1/2 -translate-x-1/2 -translate-y-1/2",
          "top-[calc(50%+1.25rem*var(--nested-dialogs))]",
          "z-[210]",
          "bg-dialog text-dialog-foreground backdrop-blur-sm",
          "ring ring-dialog-border rounded-xl shadow",
          "scale-[calc(1-0.1*var(--nested-dialogs))]",
          "outline-none transition-all w-md max-w-[calc(100%-2rem)]",
          "data-[nested-dialog-open]:after:absolute",
          "data-[nested-dialog-open]:after:inset-0",
          "data-[nested-dialog-open]:after:rounded-xl",
          "data-[nested-dialog-open]:after:bg-black/20",
          "data-[nested-dialog-open]:after:z-10",
          "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
          "data-[starting-style]:scale-90 data-[ending-style]:scale-90",
          className
        )}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export function DialogHeader(props: React.ComponentProps<"header">) {
  const { className, children, ...rest } = props;

  return (
    <header
      data-slot="dialog-header"
      {...rest}
      className={cn("px-6 pt-4.5 flex items-center gap-3.5", className)}
    >
      {children}
    </header>
  );
}

export function DialogTitle(
  props: React.ComponentProps<typeof BaseDialog.Title>
) {
  const { className, children, ...rest } = props;

  return (
    <BaseDialog.Title
      data-slot="dialog-title"
      {...rest}
      className={cn("text-xl font-semibold", className)}
    >
      {children}
    </BaseDialog.Title>
  );
}

export function DialogBody(props: React.ComponentProps<"div">) {
  const { className, children, ...rest } = props;

  return (
    <div
      data-slot="dialog-body"
      {...rest}
      className={cn("px-6 py-4.5 space-y-1.5", className)}
    >
      {children}
    </div>
  );
}

export function DialogDescription(
  props: React.ComponentProps<typeof BaseDialog.Description>
) {
  const { className, children, ...rest } = props;

  return (
    <BaseDialog.Description
      data-slot="dialog-description"
      {...rest}
      className={cn("text-muted leading-relaxed", className)}
    >
      {children}
    </BaseDialog.Description>
  );
}

export function DialogFooter(props: React.ComponentProps<"footer">) {
  const { className, children, ...rest } = props;

  return (
    <footer
      data-slot="dialog-footer"
      {...rest}
      className={cn(
        "flex items-center justify-end gap-1.5",
        "px-6 py-3.5 bg-dialog-footer border-t border-dialog-border rounded-b-xl",
        className
      )}
    >
      {children}
    </footer>
  );
}

export function DialogClose(
  props: React.ComponentProps<typeof BaseDialog.Close>
) {
  const { className, children, render, ...rest } = props;

  return (
    <BaseDialog.Close
      data-slot="dialog-close"
      render={render}
      {...rest}
      className={cn(!render && buttonVariants({ variant: "plain" }), className)}
    >
      {children}
    </BaseDialog.Close>
  );
}
