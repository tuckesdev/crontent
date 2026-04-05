/**
 * Supabase generated types.
 *
 * Regenerate via Supabase MCP `generate_typescript_types` when schema changes.
 * Hand-edits below this line get blown away on regen.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.4";
  };
  public: {
    Tables: {
      agent_events: {
        Row: {
          agent: string;
          brand_id: string | null;
          content: Json;
          created_at: string;
          event_type: string;
          id: string;
          user_id: string;
        };
        Insert: {
          agent: string;
          brand_id?: string | null;
          content?: Json;
          created_at?: string;
          event_type: string;
          id?: string;
          user_id: string;
        };
        Update: {
          agent?: string;
          brand_id?: string | null;
          content?: Json;
          created_at?: string;
          event_type?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "agent_events_brand_id_fkey";
            columns: ["brand_id"];
            isOneToOne: false;
            referencedRelation: "brands";
            referencedColumns: ["id"];
          },
        ];
      };
      brands: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          niche: string | null;
          north_star_deadline: string | null;
          north_star_metric: string | null;
          north_star_target: number | null;
          product_url: string | null;
          status: string;
          target_audience: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          niche?: string | null;
          north_star_deadline?: string | null;
          north_star_metric?: string | null;
          north_star_target?: number | null;
          product_url?: string | null;
          status?: string;
          target_audience?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          niche?: string | null;
          north_star_deadline?: string | null;
          north_star_metric?: string | null;
          north_star_target?: number | null;
          product_url?: string | null;
          status?: string;
          target_audience?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      oauth_tokens: {
        Row: {
          access_token: string;
          brand_id: string;
          created_at: string;
          expires_at: string | null;
          id: string;
          platform: string;
          platform_user_id: string | null;
          platform_username: string | null;
          refresh_token: string | null;
          scopes: Json | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          access_token: string;
          brand_id: string;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          platform: string;
          platform_user_id?: string | null;
          platform_username?: string | null;
          refresh_token?: string | null;
          scopes?: Json | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          access_token?: string;
          brand_id?: string;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          platform?: string;
          platform_user_id?: string | null;
          platform_username?: string | null;
          refresh_token?: string | null;
          scopes?: Json | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "oauth_tokens_brand_id_fkey";
            columns: ["brand_id"];
            isOneToOne: false;
            referencedRelation: "brands";
            referencedColumns: ["id"];
          },
        ];
      };
      voice_profiles: {
        Row: {
          avg_sentence_length: number | null;
          brand_id: string;
          capitalization: string | null;
          created_at: string;
          do_not_use: Json | null;
          do_use: Json | null;
          emoji_usage: string | null;
          id: string;
          samples: Json;
          style_answers: Json;
          style_notes: string | null;
          updated_at: string;
          vocabulary_signals: Json | null;
        };
        Insert: {
          avg_sentence_length?: number | null;
          brand_id: string;
          capitalization?: string | null;
          created_at?: string;
          do_not_use?: Json | null;
          do_use?: Json | null;
          emoji_usage?: string | null;
          id?: string;
          samples?: Json;
          style_answers?: Json;
          style_notes?: string | null;
          updated_at?: string;
          vocabulary_signals?: Json | null;
        };
        Update: {
          avg_sentence_length?: number | null;
          brand_id?: string;
          capitalization?: string | null;
          created_at?: string;
          do_not_use?: Json | null;
          do_use?: Json | null;
          emoji_usage?: string | null;
          id?: string;
          samples?: Json;
          style_answers?: Json;
          style_notes?: string | null;
          updated_at?: string;
          vocabulary_signals?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "voice_profiles_brand_id_fkey";
            columns: ["brand_id"];
            isOneToOne: false;
            referencedRelation: "brands";
            referencedColumns: ["id"];
          },
        ];
      };
      waitlist: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          ip: string | null;
          source: string | null;
          user_agent: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          ip?: string | null;
          source?: string | null;
          user_agent?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          ip?: string | null;
          source?: string | null;
          user_agent?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      join_waitlist: {
        Args: {
          email_input: string;
          ip_input?: string;
          source_input?: string;
          ua_input?: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Convenience type helpers
export type Brand = Database["public"]["Tables"]["brands"]["Row"];
export type BrandInsert = Database["public"]["Tables"]["brands"]["Insert"];
export type BrandUpdate = Database["public"]["Tables"]["brands"]["Update"];

export type VoiceProfile = Database["public"]["Tables"]["voice_profiles"]["Row"];
export type VoiceProfileInsert = Database["public"]["Tables"]["voice_profiles"]["Insert"];
export type VoiceProfileUpdate = Database["public"]["Tables"]["voice_profiles"]["Update"];

export type AgentEvent = Database["public"]["Tables"]["agent_events"]["Row"];
export type AgentEventInsert = Database["public"]["Tables"]["agent_events"]["Insert"];

export type OauthToken = Database["public"]["Tables"]["oauth_tokens"]["Row"];
export type OauthTokenInsert = Database["public"]["Tables"]["oauth_tokens"]["Insert"];
export type OauthTokenUpdate = Database["public"]["Tables"]["oauth_tokens"]["Update"];

/**
 * Which AI agent sent the event — typed union for safety.
 */
export type AgentId = "pilot" | "scout" | "writer" | "director" | "publisher" | "analyst";

/**
 * Event types for the agent_events audit log.
 */
export type AgentEventType =
  | "delegation"
  | "output"
  | "error"
  | "escalation"
  | "heartbeat";
