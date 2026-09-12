"use client";

import { Minus, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Art } from "@/lib/art";
import { BRAND, money } from "@/lib/site";
import { useCart } from "@/components/cart/cart-provider";

export function CartDrawer() {
  const { open, setOpen, lines, count, subtotal, setQty, remove } = useCart();
  const freeLeft = Math.max(0, BRAND.freeShippingOver - subtotal);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-[min(430px,96vw)] gap-0 border-l border-border bg-background p-0 sm:max-w-none"
      >
        <SheetHeader className="flex-row items-center justify-between border-b border-border px-6 py-5">
          <SheetTitle className="font-display text-xl tracking-[0.1em]">
            Bag{" "}
            <span className="text-xs font-normal tracking-[0.1em] text-muted-foreground">
              ({count})
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div className="py-24 text-center text-sm text-muted-foreground">
              <b className="mb-2 block font-display text-xl tracking-[0.06em] text-foreground">
                Your bag is empty
              </b>
              Add a piece from the floor and it turns up here.
            </div>
          ) : (
            lines.map(({ product, qty }) => (
              <div
                key={product.id}
                className="grid grid-cols-[64px_1fr_auto] gap-3.5 border-b border-border py-5"
              >
                <div className="aspect-4/5 overflow-hidden bg-card">
                  {product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.image} alt="" className="size-full object-cover" />
                  ) : (
                    <Art
                      kind={product.art}
                      seed={product.id}
                      label={product.name}
                      className="size-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <h5 className="text-[11.5px] leading-snug font-semibold tracking-[0.03em] uppercase">
                    {product.name}
                  </h5>
                  <small className="text-[9px] tracking-[0.14em] text-muted-foreground uppercase">
                    {product.cat} · size M
                  </small>
                  <div className="mt-3 inline-flex items-center border border-border">
                    <button
                      aria-label="Decrease"
                      className="grid size-6 place-items-center text-muted-foreground hover:text-foreground"
                      onClick={() => setQty(product.id, qty - 1)}
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="min-w-6 text-center text-xs">{qty}</span>
                    <button
                      aria-label="Increase"
                      className="grid size-6 place-items-center text-muted-foreground hover:text-foreground"
                      onClick={() => setQty(product.id, qty + 1)}
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium">
                    {money(product.price * qty)}
                  </div>
                  <button
                    className="mt-2 block text-[9px] tracking-[0.14em] text-muted-foreground uppercase underline"
                    onClick={() => remove(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 ? (
          <div className="border-t border-border px-6 py-6">
            <Row label="Subtotal" value={money(subtotal)} />
            <Row
              label="Shipping"
              value={freeLeft === 0 ? "Free" : "Calculated at checkout"}
            />
            <div className="mt-3.5 flex justify-between border-t border-border pt-3.5 text-sm font-semibold tracking-[0.06em] uppercase">
              <span>Total</span>
              <span>{money(subtotal)}</span>
            </div>
            <a
              href="#checkout"
              className="mt-4 flex w-full items-center justify-center rounded-sm border border-foreground bg-foreground px-8 py-4 text-[10px] font-bold tracking-[0.2em] text-background uppercase shadow-md transition-all duration-200 hover:border-[#52735B] hover:bg-[#52735B] hover:text-white"
            >
              Proceed to checkout
            </a>
            <p className="mt-3.5 text-center text-[10px] leading-relaxed tracking-[0.04em] text-muted-foreground">
              {freeLeft === 0
                ? "You have unlocked free islandwide shipping."
                : `Add ${money(freeLeft)} more for free islandwide shipping.`}
              <br />
              Taxes calculated at checkout.
            </p>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2 flex justify-between text-xs tracking-[0.04em] text-muted-foreground">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
