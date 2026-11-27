/**
 * Supabase contract for the tables consumed by the frontend.
 * Regenerate this file with `supabase gen types typescript` when the live
 * project is provisioned; keeping this focused contract protects the client
 * while the application is still mock-first.
 */
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          achievement: string | null;
          activity_indicator: string | null;
          auth_user_id: string | null;
          avatar_url: string | null;
          bio: string | null;
          cover_url: string | null;
          created_at: string | null;
          current_company: string | null;
          current_position: string | null;
          department: string | null;
          email: string;
          enrollment_year: number | null;
          expected_graduation_year: number | null;
          faculty: string | null;
          full_name: string;
          github_url: string | null;
          graduation_year: number | null;
          headline: string | null;
          id: string;
          industry: string | null;
          interests: string[] | null;
          is_innovator: boolean | null;
          is_mentor_available: boolean | null;
          lecturer_id: string | null;
          linkedin_url: string | null;
          location: string | null;
          major: string | null;
          mentor_expertise: string[] | null;
          portfolio_url: string | null;
          project_title: string | null;
          requested_role: Database['public']['Enums']['user_role'];
          role: Database['public']['Enums']['user_role'];
          skills: string[] | null;
          student_id: string | null;
          university: string | null;
          updated_at: string | null;
          verification_status: Database['public']['Enums']['profile_verification_status'];
        };
        Insert: {
          achievement?: string | null;
          activity_indicator?: string | null;
          auth_user_id?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          cover_url?: string | null;
          current_company?: string | null;
          current_position?: string | null;
          department?: string | null;
          email: string;
          enrollment_year?: number | null;
          expected_graduation_year?: number | null;
          faculty?: string | null;
          full_name: string;
          github_url?: string | null;
          graduation_year?: number | null;
          headline?: string | null;
          id?: string;
          industry?: string | null;
          interests?: string[] | null;
          is_innovator?: boolean | null;
          is_mentor_available?: boolean | null;
          lecturer_id?: string | null;
          linkedin_url?: string | null;
          location?: string | null;
          major?: string | null;
          mentor_expertise?: string[] | null;
          portfolio_url?: string | null;
          project_title?: string | null;
          requested_role?: Database['public']['Enums']['user_role'];
          role?: Database['public']['Enums']['user_role'];
          skills?: string[] | null;
          student_id?: string | null;
          university?: string | null;
          verification_status?: Database['public']['Enums']['profile_verification_status'];
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      profile_verification_status: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
      user_role: 'STUDENT' | 'ALUMNI' | 'LECTURER' | 'ADMIN';
    };
    CompositeTypes: Record<string, never>;
  };
};

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
