export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      batches: {
        Row: {
          created_at: string | null
          id: string
          name: string
          standard_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          standard_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          standard_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "batches_standard_id_fkey"
            columns: ["standard_id"]
            isOneToOne: false
            referencedRelation: "standards"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          batch_id: string | null
          class_date: string
          class_id: string
          class_type: Database["public"]["Enums"]["class_type"] | null
          created_at: string | null
          created_by: string | null
          end_time: string
          id: string
          notes: string | null
          standard_id: string | null
          start_time: string
          subject_id: string | null
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          batch_id?: string | null
          class_date: string
          class_id: string
          class_type?: Database["public"]["Enums"]["class_type"] | null
          created_at?: string | null
          created_by?: string | null
          end_time: string
          id?: string
          notes?: string | null
          standard_id?: string | null
          start_time: string
          subject_id?: string | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          batch_id?: string | null
          class_date?: string
          class_id?: string
          class_type?: Database["public"]["Enums"]["class_type"] | null
          created_at?: string | null
          created_by?: string | null
          end_time?: string
          id?: string
          notes?: string | null
          standard_id?: string | null
          start_time?: string
          subject_id?: string | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_standard_id_fkey"
            columns: ["standard_id"]
            isOneToOne: false
            referencedRelation: "standards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      fee_payments: {
        Row: {
          amount_paid: number
          created_at: string | null
          created_by: string | null
          id: string
          notes: string | null
          payment_date: string | null
          payment_mode: Database["public"]["Enums"]["payment_mode_type"] | null
          receipt_no: string | null
          student_id: string | null
        }
        Insert: {
          amount_paid: number
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_mode?: Database["public"]["Enums"]["payment_mode_type"] | null
          receipt_no?: string | null
          student_id?: string | null
        }
        Update: {
          amount_paid?: number
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_mode?: Database["public"]["Enums"]["payment_mode_type"] | null
          receipt_no?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fee_payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      fees_plans: {
        Row: {
          amount: number
          created_at: string | null
          duration_months: number
          id: string
          name: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          duration_months?: number
          id?: string
          name: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          duration_months?: number
          id?: string
          name?: string
        }
        Relationships: []
      }
      standards: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          address: string | null
          batch_id: string | null
          contact_number: string | null
          created_at: string | null
          created_by: string | null
          dob: string | null
          email: string | null
          fees_paid: number | null
          fees_plan_id: string | null
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: string
          joining_date: string | null
          notes: string | null
          parent_name: string | null
          pending_fees: number | null
          profile_photo_url: string | null
          standard_id: string | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          batch_id?: string | null
          contact_number?: string | null
          created_at?: string | null
          created_by?: string | null
          dob?: string | null
          email?: string | null
          fees_paid?: number | null
          fees_plan_id?: string | null
          full_name: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          joining_date?: string | null
          notes?: string | null
          parent_name?: string | null
          pending_fees?: number | null
          profile_photo_url?: string | null
          standard_id?: string | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          batch_id?: string | null
          contact_number?: string | null
          created_at?: string | null
          created_by?: string | null
          dob?: string | null
          email?: string | null
          fees_paid?: number | null
          fees_plan_id?: string | null
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          joining_date?: string | null
          notes?: string | null
          parent_name?: string | null
          pending_fees?: number | null
          profile_photo_url?: string | null
          standard_id?: string | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_fees_plan_id_fkey"
            columns: ["fees_plan_id"]
            isOneToOne: false
            referencedRelation: "fees_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_standard_id_fkey"
            columns: ["standard_id"]
            isOneToOne: false
            referencedRelation: "standards"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      teachers: {
        Row: {
          address: string | null
          contact_number: string | null
          created_at: string | null
          created_by: string | null
          dob: string | null
          email: string | null
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: string
          joining_date: string | null
          notes: string | null
          salary: number | null
          subjects: string[] | null
          teacher_id: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          contact_number?: string | null
          created_at?: string | null
          created_by?: string | null
          dob?: string | null
          email?: string | null
          full_name: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          joining_date?: string | null
          notes?: string | null
          salary?: number | null
          subjects?: string[] | null
          teacher_id: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          contact_number?: string | null
          created_at?: string | null
          created_by?: string | null
          dob?: string | null
          email?: string | null
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          joining_date?: string | null
          notes?: string | null
          salary?: number | null
          subjects?: string[] | null
          teacher_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          full_name: string
          id: string
          role: Database["public"]["Enums"]["user_role_type"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          full_name: string
          id?: string
          role?: Database["public"]["Enums"]["user_role_type"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role_type"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_class_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_student_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_teacher_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      class_type: "Lecture" | "Test"
      gender_type: "Male" | "Female" | "Other"
      payment_mode_type: "Cash" | "UPI" | "Bank Transfer" | "Card"
      user_role_type: "Admin" | "Staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      class_type: ["Lecture", "Test"],
      gender_type: ["Male", "Female", "Other"],
      payment_mode_type: ["Cash", "UPI", "Bank Transfer", "Card"],
      user_role_type: ["Admin", "Staff"],
    },
  },
} as const
