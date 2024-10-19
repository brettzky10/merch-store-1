'use server'

import prismadb from '@/lib/prismadb'
import { caseColor, caseFinish, caseMaterial, phoneModel } from '@prisma/client'

export type SaveConfigArgs = {
  color: caseColor
  finish: caseFinish
  material: caseMaterial
  model: phoneModel
  configId: string
}

export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: SaveConfigArgs) {
  await prismadb.configuration.update({
    where: { id: configId },
    data: { color, finish, material, model },
  })
}