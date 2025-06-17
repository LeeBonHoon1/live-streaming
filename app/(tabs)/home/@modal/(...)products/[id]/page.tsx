import CloseButton from "@/components/close-button";
import db from "@/lib/db";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

export default async function Modal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);
  if (isNaN(productId)) {
    return notFound();
  }

  const product = await getProduct(productId);
  if (!product) {
    return notFound();
  }

  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black">
      <CloseButton />

      <div className="flex h-2/3 w-full max-w-screen-sm flex-col gap-5 p-5">
        <div className="relative aspect-square">
          <Image
            fill
            src={`${product.photo}/public`}
            alt={product.title}
            className="object-cover"
          />
        </div>
        <div className="flex items-center gap-3 border-b border-neutral-700 p-5">
          <div className="size-10 overflow-hidden rounded-full">
            {product.user.avatar ? (
              <Image
                width={40}
                height={40}
                src={product.user.avatar}
                alt={product.user.username}
              />
            ) : (
              <UserIcon />
            )}
          </div>
          <div>
            <h3>{product.user.username}</h3>
          </div>
        </div>
        <div className="p-5">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
