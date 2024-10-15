export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _discountToproduct: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_discountToproduct_A_fkey"
            columns: ["A"]
            isOneToOne: false
            referencedRelation: "discount"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_discountToproduct_B_fkey"
            columns: ["B"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      discount: {
        Row: {
          allProducts: boolean
          code: string
          createdAt: string
          discountAmount: number
          discountType: Database["public"]["Enums"]["discountCodeType"]
          expiresAt: string | null
          id: string
          isActive: boolean
          limit: number | null
          storeId: string
          uses: number
        }
        Insert: {
          allProducts?: boolean
          code: string
          createdAt?: string
          discountAmount: number
          discountType: Database["public"]["Enums"]["discountCodeType"]
          expiresAt?: string | null
          id: string
          isActive?: boolean
          limit?: number | null
          storeId: string
          uses?: number
        }
        Update: {
          allProducts?: boolean
          code?: string
          createdAt?: string
          discountAmount?: number
          discountType?: Database["public"]["Enums"]["discountCodeType"]
          expiresAt?: string | null
          id?: string
          isActive?: boolean
          limit?: number | null
          storeId?: string
          uses?: number
        }
        Relationships: []
      }
      order: {
        Row: {
          address: string
          createdAt: string
          discountCodeId: string | null
          id: string
          isPaid: boolean
          ownerId: string
          phone: string
          updatedAt: string
        }
        Insert: {
          address?: string
          createdAt?: string
          discountCodeId?: string | null
          id: string
          isPaid?: boolean
          ownerId: string
          phone?: string
          updatedAt: string
        }
        Update: {
          address?: string
          createdAt?: string
          discountCodeId?: string | null
          id?: string
          isPaid?: boolean
          ownerId?: string
          phone?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_discountCodeId_fkey"
            columns: ["discountCodeId"]
            isOneToOne: false
            referencedRelation: "discount"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_ownerId_fkey"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "owner"
            referencedColumns: ["id"]
          },
        ]
      }
      owner: {
        Row: {
          createdAt: string
          customerId: string | null
          email: string | null
          id: string
          name: string | null
          updatedAt: string
          user_id: string
        }
        Insert: {
          createdAt?: string
          customerId?: string | null
          email?: string | null
          id: string
          name?: string | null
          updatedAt: string
          user_id: string
        }
        Update: {
          createdAt?: string
          customerId?: string | null
          email?: string | null
          id?: string
          name?: string | null
          updatedAt?: string
          user_id?: string
        }
        Relationships: []
      }
      printfulOrder: {
        Row: {
          costsAdditional: number | null
          costsCurrency: string | null
          costsDigitization: number | null
          costsDiscount: number | null
          costsShipping: number | null
          costsSubtotal: number | null
          costsTax: string | null
          costsTotal: number | null
          costsVat: number | null
          createdAt: string
          currency: string
          dashboardUrl: string | null
          externalId: string
          hasDiscontinuedItems: boolean
          hasIncompleteItems: boolean
          hasOutOfStockItems: boolean
          id: number
          recipientAddress: string
          recipientCity: string
          recipientCountry: string
          recipientEmail: string
          recipientName: string
          recipientPhone: string
          recipientState: string
          recipientZip: string
          retailCurrency: string | null
          retailDiscount: number | null
          retailShipping: number | null
          retailSubtotal: number | null
          retailTotal: number | null
          shipDate: string | null
          shippingMethod: string
          shippingService: string
          status: string
          totalCost: number
          trackingUrl: string | null
          updatedAt: string
        }
        Insert: {
          costsAdditional?: number | null
          costsCurrency?: string | null
          costsDigitization?: number | null
          costsDiscount?: number | null
          costsShipping?: number | null
          costsSubtotal?: number | null
          costsTax?: string | null
          costsTotal?: number | null
          costsVat?: number | null
          createdAt: string
          currency: string
          dashboardUrl?: string | null
          externalId: string
          hasDiscontinuedItems?: boolean
          hasIncompleteItems?: boolean
          hasOutOfStockItems?: boolean
          id?: number
          recipientAddress: string
          recipientCity: string
          recipientCountry: string
          recipientEmail: string
          recipientName: string
          recipientPhone: string
          recipientState: string
          recipientZip: string
          retailCurrency?: string | null
          retailDiscount?: number | null
          retailShipping?: number | null
          retailSubtotal?: number | null
          retailTotal?: number | null
          shipDate?: string | null
          shippingMethod: string
          shippingService: string
          status: string
          totalCost: number
          trackingUrl?: string | null
          updatedAt: string
        }
        Update: {
          costsAdditional?: number | null
          costsCurrency?: string | null
          costsDigitization?: number | null
          costsDiscount?: number | null
          costsShipping?: number | null
          costsSubtotal?: number | null
          costsTax?: string | null
          costsTotal?: number | null
          costsVat?: number | null
          createdAt?: string
          currency?: string
          dashboardUrl?: string | null
          externalId?: string
          hasDiscontinuedItems?: boolean
          hasIncompleteItems?: boolean
          hasOutOfStockItems?: boolean
          id?: number
          recipientAddress?: string
          recipientCity?: string
          recipientCountry?: string
          recipientEmail?: string
          recipientName?: string
          recipientPhone?: string
          recipientState?: string
          recipientZip?: string
          retailCurrency?: string | null
          retailDiscount?: number | null
          retailShipping?: number | null
          retailSubtotal?: number | null
          retailTotal?: number | null
          shipDate?: string | null
          shippingMethod?: string
          shippingService?: string
          status?: string
          totalCost?: number
          trackingUrl?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
      product: {
        Row: {
          description: string
          id: string
          imagePath: string
          isAvailableForPurchase: boolean
          name: string
          ownerId: string
          priceInCents: number
          quantity: number
        }
        Insert: {
          description?: string
          id: string
          imagePath: string
          isAvailableForPurchase?: boolean
          name: string
          ownerId: string
          priceInCents: number
          quantity?: number
        }
        Update: {
          description?: string
          id?: string
          imagePath?: string
          isAvailableForPurchase?: boolean
          name?: string
          ownerId?: string
          priceInCents?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_ownerId_fkey"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "owner"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      discountCodeType: "PERCENTAGE" | "FIXED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
