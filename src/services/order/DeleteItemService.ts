import prismaClient from "../../prisma";

interface ItemRequest {
  item_id: string;
}

class DeleteItemService {
  async execute({ item_id }: ItemRequest) {
    const order = await prismaClient.order.delete({
      where: {
        id: item_id,
      },
    });

    return order;
  }
}

export { DeleteItemService };
