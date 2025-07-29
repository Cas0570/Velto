export interface CreateRequestFormProps {
  onSubmit?: (data: { amount: number; description: string }) => void;
  loading?: boolean;
}

export interface PaymentRequest {
  id: string;
  amount: number;
  description: string;
  status: PaymentStatus;
  createdAt: string;
  link: string;
  paymentCount: number;
}

export interface PaymentRequestCardProps {
  request: PaymentRequest;
  className?: string;
  onCopy?: (link: string) => void;
  onShare?: (link: string) => void;
  onShowQR?: (link: string) => void;
  onCardClick?: () => void;
}

export interface StatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface TopNavigationProps {
  user?: User;
  onSearch?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

export interface VeltoCardProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
  hover?: boolean;
  onClick?: () => void;
}

export interface VeltoLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export interface AuthProps {
  onLogin?: (email: string, password: string) => void;
  onSignUp?: (email: string, password: string, name: string) => void;
  loading?: boolean;
}

export interface CreateRequestProps {
  onBack?: () => void;
}

export interface DashboardProps {
  onCreateRequest?: () => void;
  onSearch?: () => void;
  onViewDetails?: (requestId: string) => void;
}

export interface PaymentDetailsProps {
  requestId: string;
  onBack: () => void;
}

export interface SearchProps {
  onBack?: () => void;
  onViewDetails: (requestId: string) => void;
}

export type PaymentStatus = "paid" | "pending" | "expired" | "failed";
